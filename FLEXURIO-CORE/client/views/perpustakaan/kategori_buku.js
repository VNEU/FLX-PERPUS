
          /**
          * Generated from flexurio at Kam Mar 14 16:37:13 WIB 2019
          * By claudia at Linux claudia 4.15.0-29-generic #31-Ubuntu SMP Tue Jul 17 15:39:52 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
          */

         import { Template } from 'meteor/templating';
         import { Session } from 'meteor/session';
         import './kategori_buku.html';
   
         Template.kategori_buku.created = function () {
            Session.set('limit', 50);
            Session.set('oFILTERS', {});
            Session.set('oOPTIONS', {});
            Session.set('textSearch', '');
            Session.set('namaHeader', 'DATA KATEGORI_BUKU');
            Session.set('dataDelete', '');
            Session.set('isCreating', false);
            Session.set('isDeleting', false);
   
            if(Session.get('KodeKategori')){
               Router.go('kodekategori')
            }
   
            this.autorun(function () {
                   subscribtion('kategori_buku', Session.get('oFILTERS'), Session.get('oOPTIONS'), Session.get('limit'));
            });
          };
   
           Template.kategori_buku.onRendered(function () {
               ScrollHandler();
           });
   
           Template.kategori_buku.helpers({
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
            kategori_bukus: function() {
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
                  
            {nama: { $regex : new RegExp(textSearch, 'i') }},
            
            {icons: { $regex : new RegExp(textSearch, 'i') }},
            
                  {_id: { $regex : new RegExp(textSearch, 'i') }},
                  ]
               }
   
               return KATEGORI_BUKU.find(
                   oFILTERS,
                   oOPTIONS
               );
            }
         });
   
         Template.kategori_buku.events({
            'click a.cancel': function(e, tpl){
               e.preventDefault();
               Session.set('isCreating', false);
               Session.set('isEditing', false);
               Session.set('idEditing', '');
               Session.set('isDeleting', false);
            },
   
            'click a.deleteDataOK': function(e, tpl){
               e.preventDefault();
               deleteKATEGORI_BUKU();
               FlashMessages.sendWarning('Attention, ' + Session.get('dataDelete') + ' successfully DELETE !');
               Session.set('isDeleting', false);
            },
            'click a.deleteData': function(e, tpl){
               e.preventDefault();
               Scroll2Top();
   
               Session.set('isDeleting', true);
               Session.set('dataDelete', Session.get('namaHeader').toLowerCase() + ' ' + this.kategori_buku);
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
            'keyup #namaKATEGORI_BUKU': function (e, tpl) {
               e.preventDefault();
               if (e.keyCode == 13) {
                  insertKATEGORI_BUKU(tpl);
               }
            },
            'click a.save': function(e, tpl){
               e.preventDefault();
               insertKATEGORI_BUKU(tpl);
            },
   
            'click a.editData': function(e, tpl){
               e.preventDefault();
               Scroll2Top();
   
               Session.set('idEditing', this._id);
               Session.set('isEditing', true);
            },
            'keyup #namaEditKATEGORI_BUKU': function (e, tpl) {
               e.preventDefault();
               if (e.keyCode == 13) {
                  updateKATEGORI_BUKU(tpl);
               }
            },
            'click a.saveEDIT': function(e, tpl){
               e.preventDefault();
               updateKATEGORI_BUKU(tpl);
            },
            'submit form.form-comments': function (e, tpl) {
               e.preventDefault();
               flxcomments(e,tpl,KATEGORI_BUKU);
   
            },
   
               'click a.kategori_buku': function (e, tpl) {
                  e.preventDefault();
   
                  Session.set("kodekategori", this._id)
                  Router.go("sub_kategori");
            },
   
         });
   
   
         insertKATEGORI_BUKU = function (tpl) {
   
            
            let namaKATEGORI_BUKU = tpl.$('input[name="namaKATEGORI_BUKU"]').val();
            
            let iconsKATEGORI_BUKU = tpl.$('input[name="iconsKATEGORI_BUKU"]').val();
            
   
            if(!adaDATA(namaKATEGORI_BUKU) | !adaDATA(iconsKATEGORI_BUKU) ) {
               FlashMessages.sendWarning('Please complete all of the data to be . . .');
               return;
            }
   
            KATEGORI_BUKU.insert(
            {
            kategori_buku: (Session.get('kodekategori')),
            nama: namaKATEGORI_BUKU,
            
            icons: iconsKATEGORI_BUKU,
            
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
   
   
         updateKATEGORI_BUKU = function (tpl) {
   
            
            let namaEditKATEGORI_BUKU = tpl.$('input[name="namaEditKATEGORI_BUKU"]').val();
            
            let iconsEditKATEGORI_BUKU = tpl.$('input[name="iconsEditKATEGORI_BUKU"]').val();
                     
   
            if(!adaDATA(namaEditKATEGORI_BUKU) | !adaDATA(iconsEditKATEGORI_BUKU) ) {
               FlashMessages.sendWarning('Please complete all of the data to be . . .');
               return;
            }
   
            KATEGORI_BUKU.update({_id:Session.get('idEditing')},
            { $set:{
               
            nama: namaEditKATEGORI_BUKU,
            
            icons: iconsEditKATEGORI_BUKU,
            
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
   
      deleteKATEGORI_BUKU = function () {
   
         if(!adaDATA(Session.get('idDeleting'))) {
            FlashMessages.sendWarning('Please skategoriEditKATEGORI_BUKU,elect data that you want to remove . . .');
            return;
         }
   
         KATEGORI_BUKU.update({_id:Session.get('idDeleting')},
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
   
   
       
   