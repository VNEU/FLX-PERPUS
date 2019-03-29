
          /**
          * Generated from flexurio at Thu Mar 28 11:15:55 WIB 2019
          * By anis at Linux anis-HP-14-Notebook-PC 4.18.0-15-generic #16~18.04.1-Ubuntu SMP Thu Feb 7 14:06:04 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './Anggota.html';

      Template.Anggota.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA ANGGOTA');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
                subscribtion('Anggota', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.Anggota.onRendered(function () {
            ScrollHandler();
        });

        Template.Anggota.helpers({
            isLockMenu: function () {
                return isLockMenu();
            },

            isActionADD: function () {
                return isAdminActions(Session.get('sURLMenu'), 'ADD');
            },

            isActionEDIT: function () {
                return isAdminActions(Session.get('sURLMenu'), 'EDIT');
            },

            isActionDELETE: function () {
                return isAdminActions(Session.get('sURLMenu'), 'DELETE');
            },

            isActionPRINT: function () {
                return isAdminActions(Session.get('sURLMenu'), 'PRINT');
            },

         sTinggiPopUp: function () {
            return 0.6*($(window).height());
         },
         isEditing: function() {
            return Session.get('idEditing') == this._id;
         },
         isDeleting: function() {
            return Session.get('isDeleting');
         },
         isCreating: function() {
            return Session.get('isCreating');
         },
         Anggotas: function() {
            let textSearch = '';
            if(adaDATA(Session.get('textSearch'))) {
               textSearch = Session.get('textSearch').replace('#', '').trim();
            }

            let oOPTIONS = {
               sort: {createAt: -1},
               limit: Session.get('limit')
            }

            let oFILTERS = {
               aktifYN: 1,
               $or: [
               
         {nama_anggota: { $regex : new RegExp(textSearch, 'i') }},
         
         {jenis_kelamin: { $regex : new RegExp(textSearch, 'i') }},
         
         {no_ktp: { $regex : new RegExp(textSearch, 'i') }},
         
         {alamat: { $regex : new RegExp(textSearch, 'i') }},
         
         {email: { $regex : new RegExp(textSearch, 'i') }},
         
         {no_telp: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return ANGGOTA.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.Anggota.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteANGGOTA();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.nama_anggota);
            Session.set('idDeleting', this._id);

            setTimeout(function(){
               $('#modal_formDeleting').modal('open')
            },300)
         },

         'click a.create': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isCreating', true);
         },
         'keyup #namaANGGOTA': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertANGGOTA(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertANGGOTA(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditANGGOTA': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateANGGOTA(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateANGGOTA(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,ANGGOTA);
        }

      });


      insertANGGOTA = function (tpl) {

         
         let nama_anggotaANGGOTA = tpl.$('input[name="nama_anggotaANGGOTA"]').val();
         
         let jenis_kelaminANGGOTA = tpl.$('select[name="jenis_kelaminANGGOTA"]').val();
         
         let no_ktpANGGOTA = tpl.$('input[name="no_ktpANGGOTA"]').val();
         
         let alamatANGGOTA = tpl.$('input[name="alamatANGGOTA"]').val();
         
         let emailANGGOTA = tpl.$('input[name="emailANGGOTA"]').val();
         
         let no_telpANGGOTA = tpl.$('input[name="no_telpANGGOTA"]').val();
         

         if(!adaDATA(nama_anggotaANGGOTA) | !adaDATA(jenis_kelaminANGGOTA) | !adaDATA(no_ktpANGGOTA) | !adaDATA(alamatANGGOTA) | !adaDATA(emailANGGOTA) | !adaDATA(no_telpANGGOTA) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         ANGGOTA.insert(
         {
            
         nama_anggota: nama_anggotaANGGOTA,
         
         jenis_kelamin: jenis_kelaminANGGOTA,
         
         no_ktp: no_ktpANGGOTA,
         
         alamat: alamatANGGOTA,
         
         email: emailANGGOTA,
         
         no_telp: no_telpANGGOTA,
         
            aktifYN: 1,
            createByID: UserID(),
            createBy:UserName(),
            createAt: new Date()
         },
         function (err, id) {
            if(err) {
               FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
            } else {
               Session.set('isCreating', false);
               FlashMessages.sendSuccess('Thanks, your data is successfully saved');
            }
         }
         );
      };


      updateANGGOTA = function (tpl) {

         
         let nama_anggotaEditANGGOTA = tpl.$('input[name="nama_anggotaEditANGGOTA"]').val();
         
         let jenis_kelaminEditANGGOTA = tpl.$('select[name="jenis_kelaminEditANGGOTA"]').val();
         
         let no_ktpEditANGGOTA = tpl.$('input[name="no_ktpEditANGGOTA"]').val();
         
         let alamatEditANGGOTA = tpl.$('input[name="alamatEditANGGOTA"]').val();
         
         let emailEditANGGOTA = tpl.$('input[name="emailEditANGGOTA"]').val();
         
         let no_telpEditANGGOTA = tpl.$('input[name="no_telpEditANGGOTA"]').val();
         

         if(!adaDATA(nama_anggotaEditANGGOTA) | !adaDATA(jenis_kelaminEditANGGOTA) | !adaDATA(no_ktpEditANGGOTA) | !adaDATA(alamatEditANGGOTA) | !adaDATA(emailEditANGGOTA) | !adaDATA(no_telpEditANGGOTA) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         ANGGOTA.update({_id:Session.get('idEditing')},
         { $set:{
            
         nama_anggota: nama_anggotaEditANGGOTA,
         
         jenis_kelamin: jenis_kelaminEditANGGOTA,
         
         no_ktp: no_ktpEditANGGOTA,
         
         alamat: alamatEditANGGOTA,
         
         email: emailEditANGGOTA,
         
         no_telp: no_telpEditANGGOTA,
         
            updateByID: UserID(),
            updateBy:UserName(),
            updateAt: new Date()
         }
      },
      function (err, id) {
         if(err) {
            FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
         } else {
            Session.set('idEditing', '');
            Session.set('isEditing', false);
            FlashMessages.sendSuccess('Thanks, your data is successfully saved');
         }
      }
      );
   };

   deleteANGGOTA = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      ANGGOTA.update({_id:Session.get('idDeleting')},
          { $set:{
             aktifYN: 0,
             deleteByID: UserID(),
             deleteBy:UserName(),
             deleteAt: new Date()
          }
       },
       function (err, id) {
          if(err) {
             FlashMessages.sendWarning('Sorry, Data could not be saved - Please repeat again.');
          } else {
             Session.set('idEditing', '');
             FlashMessages.sendSuccess('Thanks, your data is successfully saved');
          }
       }
       );
    };


    
