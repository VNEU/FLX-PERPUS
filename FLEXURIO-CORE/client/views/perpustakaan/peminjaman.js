
          /**
          * Generated from flexurio at Tue Apr  2 10:57:43 WIB 2019
          * By restu at Linux mozart-inspiron-n4050 4.15.0-46-generic #49-Ubuntu SMP Wed Feb 6 09:33:07 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './peminjaman.html';

      Template.peminjaman.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA PEMINJAMAN');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
            subscribtion('peminjaman', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
            subscribtion('Anggota', {aktifYN:1}, {}, 0);
            subscribtion('Buku', {aktifYN:1}, {}, 0);
         });
       };

        Template.peminjaman.onRendered(function () {
            ScrollHandler();
        });

        Template.peminjaman.helpers({

         Buku:function(){
            return BUKU.find().fetch()
         },
         Anggota:function(){
            return ANGGOTA.find().fetch()
         },
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
         peminjamans: function() {
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
               
         {tglpinjam: { $regex : new RegExp(textSearch, 'i') }},
         
         {namaanggota: { $regex : new RegExp(textSearch, 'i') }},
         
         {notlp: { $regex : new RegExp(textSearch, 'i') }},
         
         {lamapinjam: { $regex : new RegExp(textSearch, 'i') }},
         
         {judulbuku: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return PEMINJAMAN.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.peminjaman.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deletePEMINJAMAN();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.namaanggota+" "+"Tanggal Pinjam"+" "+this.tglpinjam);
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
         'keyup #namaPEMINJAMAN': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertPEMINJAMAN(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertPEMINJAMAN(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditPEMINJAMAN': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updatePEMINJAMAN(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updatePEMINJAMAN(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,PEMINJAMAN);
        }
   

      });


      insertPEMINJAMAN = function (tpl) {

         
         let tglpinjamPEMINJAMAN = tpl.$('input[name="tglpinjamPEMINJAMAN"]').val();
         
         let namaanggotaPEMINJAMAN = tpl.$('select[name="namaanggotaPEMINJAMAN"]').val();
         
         let notlpPEMINJAMAN = tpl.$('input[name="notlpPEMINJAMAN"]').val();
         
         let lamapinjamPEMINJAMAN = tpl.$('select[name="lamapinjamPEMINJAMAN"]').val();
         
         let judulbukuPEMINJAMAN = tpl.$('select[name="judulbukuPEMINJAMAN"]').val();
         

         if(!adaDATA(tglpinjamPEMINJAMAN) | !adaDATA(namaanggotaPEMINJAMAN) | !adaDATA(notlpPEMINJAMAN) | !adaDATA(lamapinjamPEMINJAMAN) | !adaDATA(judulbukuPEMINJAMAN) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         PEMINJAMAN.insert(
         {
            
         tglpinjam: tglpinjamPEMINJAMAN,
         
         namaanggota: namaanggotaPEMINJAMAN,
         
         notlp: notlpPEMINJAMAN,
         
         lamapinjam: lamapinjamPEMINJAMAN,
         
         judulbuku: judulbukuPEMINJAMAN,
         
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


      updatePEMINJAMAN = function (tpl) {

         
         let tglpinjamEditPEMINJAMAN = tpl.$('input[name="tglpinjamEditPEMINJAMAN"]').val();
         
         let namaanggotaEditPEMINJAMAN = tpl.$('input[name="namaanggotaEditPEMINJAMAN"]').val();
         
         let notlpEditPEMINJAMAN = tpl.$('input[name="notlpEditPEMINJAMAN"]').val();
         
         let lamapinjamEditPEMINJAMAN = tpl.$('input[name="lamapinjamEditPEMINJAMAN"]').val();
         
         let judulbukuEditPEMINJAMAN = tpl.$('input[name="judulbukuEditPEMINJAMAN"]').val();
         

         if(!adaDATA(tglpinjamEditPEMINJAMAN) | !adaDATA(namaanggotaEditPEMINJAMAN) | !adaDATA(notlpEditPEMINJAMAN) | !adaDATA(lamapinjamEditPEMINJAMAN) | !adaDATA(judulbukuEditPEMINJAMAN) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         PEMINJAMAN.update({_id:Session.get('idEditing')},
         { $set:{
            
         tglpinjam: tglpinjamEditPEMINJAMAN,
         
         namaanggota: namaanggotaEditPEMINJAMAN,
         
         notlp: notlpEditPEMINJAMAN,
         
         lamapinjam: lamapinjamEditPEMINJAMAN,
         
         judulbuku: judulbukuEditPEMINJAMAN,
         
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

   deletePEMINJAMAN = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      PEMINJAMAN.update({_id:Session.get('idDeleting')},
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


    
