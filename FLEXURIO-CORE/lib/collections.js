/**
 * Flexurio Created by YN.Pamungkas Jayuda on 12/3/15.
 */
import {Mongo} from 'meteor/mongo';

MENU = new Mongo.Collection('menu');
MENUGROUP = new Mongo.Collection('menuGroup');
MENUAUTH = new Mongo.Collection('menuAuth');
MEMBER = Meteor.users;
MESSAGE = new Mongo.Collection('message');
MESSAGEMEMBER = new Mongo.Collection('messageMember');

ACTIVITYLOGS = new Mongo.Collection('activitylogs');
PROFILEDATA = new Mongo.Collection('profileData');
WOTIPE = new Mongo.Collection('woTipe');
WOSUBTIPE = new Mongo.Collection('woSubTipe');
WOSUBTIPEDETAIL = new Mongo.Collection('woSubTipeDetail');
WO = new Mongo.Collection('wo');
APIMANAGER = new Mongo.Collection('apimanager');
KATEGORI_BUKU = new Mongo.Collection('kategori_buku'); 
SUB_KATEGORI = new Mongo.Collection('sub_kategori'); 
ANGGOTA = new Mongo.Collection('Anggota'); 
KATEGORI = new Mongo.Collection('kategori'); 
SUBKATEGORI = new Mongo.Collection('subKategori'); 
BUKU = new Mongo.Collection('Buku'); 
PEMINJAMAN = new Mongo.Collection('peminjaman'); 
