
          /**
          * Generated from flexurio at Sel Apr  2 08:19:37 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-46-generic #49-Ubuntu SMP Wed Feb 6 09:33:07 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './kategori.html';

      Template.kategori.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA KATEGORI');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
                subscribtion('kategori', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.kategori.onRendered(function () {
            ScrollHandler();
        });

        Template.kategori.helpers({
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
         kategoris: function() {
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
               
         {kategori: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return KATEGORI.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.kategori.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteKATEGORI();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.kategori);
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
         'keyup #namaKATEGORI': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertKATEGORI(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertKATEGORI(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditKATEGORI': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateKATEGORI(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateKATEGORI(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,KATEGORI);
        },
        'click a.lihatSub': function(e, tpl){
           e.preventDefault();
           Session.set('lihatsub',this._id);
           Router.go('subKategori')
        }

      });


      insertKATEGORI = function (tpl) {

         
         let kategoriKATEGORI = tpl.$('input[name="kategoriKATEGORI"]').val();
         

         if(!adaDATA(kategoriKATEGORI) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         KATEGORI.insert(
         {
            
         kategori: kategoriKATEGORI,
         
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


      updateKATEGORI = function (tpl) {

         
         let kategoriEditKATEGORI = tpl.$('input[name="kategoriEditKATEGORI"]').val();
         

         if(!adaDATA(kategoriEditKATEGORI) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         KATEGORI.update({_id:Session.get('idEditing')},
         { $set:{
            
         kategori: kategoriEditKATEGORI,
         
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

   deleteKATEGORI = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      KATEGORI.update({_id:Session.get('idDeleting')},
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


    
