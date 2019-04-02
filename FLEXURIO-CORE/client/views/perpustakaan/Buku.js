
          /**
          * Generated from flexurio at Sel Apr  2 09:10:02 WIB 2019
          * By muhamad at Linux muhamad-X455YA 4.15.0-46-generic #49-Ubuntu SMP Wed Feb 6 09:33:07 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

      import { Template } from 'meteor/templating';
      import { Session } from 'meteor/session';
      import './Buku.html';

      Template.Buku.created = function () {
         Session.set('limit', 50);
         Session.set('oFILTERS', {});
         Session.set('oOPTIONS', {});
         Session.set('textSearch', '');
         Session.set('namaHeader', 'DATA BUKU');
         Session.set('dataDelete', '');
         Session.set('isCreating', false);
         Session.set('isDeleting', false);
         if(!adaDATA(Session.get('lihatbuku'))){
            Router.go('subKategori')
         }

         this.autorun(function () {
                subscribtion('subKategori',{aktifYN: 1},{},0);
                subscribtion('Buku', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
         });
       };

        Template.Buku.onRendered(function () {
            ScrollHandler();
        });

        Template.Buku.helpers({
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
         Bukus: function() {
            let textSearch = '';
            if(adaDATA(Session.get('textSearch'))) {
               textSearch = Session.get('textSearch').replace('#', '').trim();
            }

            let oOPTIONS = {
               sort: {createAt: -1},
               limit: Session.get('limit')
            }

            let oFILTERS = {
               subKategori: Session.get('lihatbuku'),
               aktifYN: 1,
               $or: [
               
         {judul: { $regex : new RegExp(textSearch, 'i') }},
         
         {penulis: { $regex : new RegExp(textSearch, 'i') }},
         
         {penerbit: { $regex : new RegExp(textSearch, 'i') }},
         
         {tahunterbit: { $regex : new RegExp(textSearch, 'i') }},
         
         {isbn: { $regex : new RegExp(textSearch, 'i') }},
         
               {_id: { $regex : new RegExp(textSearch, 'i') }},
               ]
            }

            return BUKU.find(
                oFILTERS,
                oOPTIONS
            );
         }
      });

      Template.Buku.events({
         'click a.cancel': function(e, tpl){
            e.preventDefault();
            Session.set('isCreating', false);
            Session.set('isEditing', false);
            Session.set('idEditing', '');
            Session.set('isDeleting', false);
         },

         'click a.deleteDataOK': function(e, tpl){
            e.preventDefault();
            deleteBUKU();
            FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
            Session.set('isDeleting', false);
         },
         'click a.deleteData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('isDeleting', true);
            Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.judul);
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
         'keyup #namaBUKU': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               insertBUKU(tpl);
            }
         },
         'click a.save': function(e, tpl){
            e.preventDefault();
            insertBUKU(tpl);
         },

         'click a.editData': function(e, tpl){
            e.preventDefault();
            Scroll2Top();

            Session.set('idEditing', this._id);
            Session.set('isEditing', true);
         },
         'keyup #namaEditBUKU': function (e, tpl) {
            e.preventDefault();
            if (e.keyCode == 13) {
               updateBUKU(tpl);
            }
         },
         'click a.saveEDIT': function(e, tpl){
            e.preventDefault();
            updateBUKU(tpl);
         },
         'submit form.form-comments': function (e, tpl) {
            e.preventDefault();
            flxcomments(e,tpl,BUKU);
        }

      });


      insertBUKU = function (tpl) {

         
         let judulBUKU = tpl.$('input[name="judulBUKU"]').val();
         
         let penulisBUKU = tpl.$('input[name="penulisBUKU"]').val();
         
         let penerbitBUKU = tpl.$('input[name="penerbitBUKU"]').val();
         
         let tahunterbitBUKU = tpl.$('input[name="tahunterbitBUKU"]').val();
         
         let isbnBUKU = tpl.$('input[name="isbnBUKU"]').val();
         

         if(!adaDATA(judulBUKU) | !adaDATA(penulisBUKU) | !adaDATA(penerbitBUKU) | !adaDATA(tahunterbitBUKU) | !adaDATA(isbnBUKU) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         BUKU.insert(
         {
            
         judul: judulBUKU,
         
         penulis: penulisBUKU,
         
         penerbit: penerbitBUKU,
         
         tahunterbit: tahunterbitBUKU,
         
         isbn: isbnBUKU,
         
            aktifYN: 1,
            subKategori: Session.get('lihatbuku'),
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


      updateBUKU = function (tpl) {

         
         let judulEditBUKU = tpl.$('input[name="judulEditBUKU"]').val();
         
         let penulisEditBUKU = tpl.$('input[name="penulisEditBUKU"]').val();
         
         let penerbitEditBUKU = tpl.$('input[name="penerbitEditBUKU"]').val();
         
         let tahunterbitEditBUKU = tpl.$('input[name="tahunterbitEditBUKU"]').val();
         
         let isbnEditBUKU = tpl.$('input[name="isbnEditBUKU"]').val();
         

         if(!adaDATA(judulEditBUKU) | !adaDATA(penulisEditBUKU) | !adaDATA(penerbitEditBUKU) | !adaDATA(tahunterbitEditBUKU) | !adaDATA(isbnEditBUKU) ) {
            FlashMessages.sendWarning('Please complete all of the data to be . . .');
            return;
         }

         BUKU.update({_id:Session.get('idEditing')},
         { $set:{
            
         judul: judulEditBUKU,
         
         penulis: penulisEditBUKU,
         
         penerbit: penerbitEditBUKU,
         
         tahunterbit: tahunterbitEditBUKU,
         
         isbn: isbnEditBUKU,
         
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

   deleteBUKU = function () {

      if(!adaDATA(Session.get('idDeleting'))) {
         FlashMessages.sendWarning('Please select data that you want to remove . . .');
         return;
      }

      BUKU.update({_id:Session.get('idDeleting')},
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


    
