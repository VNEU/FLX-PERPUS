
          /**
          * Generated from flexurio at Kam Mar 28 09:34:05 WIB 2019
          * By claudia at Linux claudia 4.15.0-29-generic #31-Ubuntu SMP Tue Jul 17 15:39:52 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './sub_kategori.html';

      Template.sub_kategori.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA SUB_KATEGORI');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);

         this.autorun(function () {
                subscribtion('sub_kategori', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.sub_kategori.onRendered(function () {
            ScrollHandler();
        });

        Template.sub_kategori.helpers({
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
         sub_kategoris: function() {
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
               
         {sub_kategori: { $regex : new RegExp(textSearch, 'i') }},
         
         {icons: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return SUB_KATEGORI.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.sub_kategori.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteSUB_KATEGORI();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.sub_kategori);
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
         'keyup #namaSUB_KATEGORI': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertSUB_KATEGORI(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertSUB_KATEGORI(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditSUB_KATEGORI': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateSUB_KATEGORI(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateSUB_KATEGORI(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,SUB_KATEGORI);
        }

      });


      insertSUB_KATEGORI = function (tpl) {

         
         let sub_kategoriSUB_KATEGORI = tpl.$('input[name="sub_kategoriSUB_KATEGORI"]').val();
         
         let iconsSUB_KATEGORI = tpl.$('input[name="iconsSUB_KATEGORI"]').val();
         

         if(!adaDATA(sub_kategoriSUB_KATEGORI) | !adaDATA(iconsSUB_KATEGORI) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         SUB_KATEGORI.insert(
         {
            
         sub_kategori: sub_kategoriSUB_KATEGORI,
         
         icons: iconsSUB_KATEGORI,
         
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


      updateSUB_KATEGORI = function (tpl) {

         
         let sub_kategoriEditSUB_KATEGORI = tpl.$('input[name="sub_kategoriEditSUB_KATEGORI"]').val();
         
         let iconsEditSUB_KATEGORI = tpl.$('input[name="iconsEditSUB_KATEGORI"]').val();
         

         if(!adaDATA(sub_kategoriEditSUB_KATEGORI) | !adaDATA(iconsEditSUB_KATEGORI) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         SUB_KATEGORI.update({_id:Session.get('idEditing')},
         { $set:{
            
         sub_kategori: sub_kategoriEditSUB_KATEGORI,
         
         icons: iconsEditSUB_KATEGORI,
         
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

   deleteSUB_KATEGORI = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      SUB_KATEGORI.update({_id:Session.get('idDeleting')},
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


    
