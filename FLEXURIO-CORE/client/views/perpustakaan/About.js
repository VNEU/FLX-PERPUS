
          /**
          * Generated from flexurio at Thu Mar 28 10:12:17 WIB 2019
          * By restu at Linux mozart-inspiron-n4050 4.15.0-46-generic #49-Ubuntu SMP Wed Feb 6 09:33:07 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux
          */

         import { Template } from 'meteor/templating';
         import { Session } from 'meteor/session';
         import './About.html';
   
         Template.about.created = function () {
            Session.set('limit', 50);
            Session.set('oFILTERS', {});
            Session.set('oOPTIONS', {});
            Session.set('textSearch', '');
            Session.set('namaHeader', 'DATA ABOUT');
            Session.set('dataDelete', '');
            Session.set('isCreating', false);
            Session.set('isDeleting', false);
   
            this.autorun(function () {
                subscribtion('About', {}, {}, 0);
            });
          };
   
           Template.about.onRendered(function () {
               ScrollHandler();
            });
   
            Template.about.events({
                 'click a.logo':function(e,tpl){
                    e.preventDefault();
                    Router.go('/home')
                }
            });
   
   
       
   