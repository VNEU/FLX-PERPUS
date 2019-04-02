/**
 * Flexurio Created by YN.Pamungkas Jayuda on 12/3/15.
 */
Router.plugin('dataNotFound', {notFoundTemplate: 'oraono'});
Router.configure({
    notFoundTemplate: 'oraono'
});

Router.route('/', function () {
    this.render('home');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});

Router.route('/oraono', function () {
    Session.set('sURLMenu', 'oraono');
    this.render('oraono');
});

Router.route('/menu', function () {
    Session.set('sURLMenu', 'menuGroup');
    this.render('menu');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});

Router.route('/menuGroup', function () {
    Session.set('sURLMenu', 'menuGroup');
    this.render('menuGroup');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});


Router.route('/menuAuth', function () {
    Session.set('sURLMenu', 'member');
    this.render('menuAuth');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});


Router.route('/member', function () {
    Session.set('sURLMenu', 'member');
    this.render('member');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});



Router.route('/message', function () {
    Session.set('sURLMenu', 'message');
    this.render('message'); 
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});

Router.route('/activitylogs', function () {
    Session.set('sURLMenu', 'activitylogs');
    this.render('activitylogs'); 
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});


Router.route('/profileData', function () {
    Session.set('sURLMenu', 'profileData');
    this.render('profileData');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});

Router.route('/profile', function () {
    this.render('profile');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});



Router.route('/woTipe', function () {
    Session.set('sURLMenu', 'woTipe');
    this.render('woTipe');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});


Router.route('/woSubTipe', function () {
    Session.set('sURLMenu', 'woTipe');
    this.render('woSubTipe');
    Session.set('lihatbuku')=='';
});


Router.route('/woSubTipeDetail', function () {
    Session.set('sURLMenu', 'woTipe');
    this.render('woSubTipeDetail');
    Session.set('lihatbuku')=='';
});


Router.route('/wo', function () {
    Session.set('sURLMenu', 'wo');
    this.render('wo');
    Session.set('lihatbuku')=='';
    Session.set('lihatsub')=='';
});

   

    Router.route('/Anggota', function () {
        Session.set('sURLMenu', 'Anggota');
       this.render('Anggota');
       Session.set('lihatbuku')=='';
       Session.set('lihatsub')=='';
    });
    

    Router.route('/kategori', function () {
        Session.set('sURLMenu', 'kategori');
       this.render('kategori');
     
      
    });
    

    Router.route('/subKategori', function () {
        Session.set('sURLMenu', 'subKategori');
       this.render('subKategori');

     
       
    });
    

    Router.route('/Buku', function () {
        Session.set('sURLMenu', 'Buku');
       this.render('Buku');
       Session.get('lihatBuku')
       Session.set('lihatsub')=='';
    });
    
