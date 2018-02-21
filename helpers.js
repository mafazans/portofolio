const fs = require('fs');

exports.moment = require('moment');

exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`)

exports.siteName = `Arif Mafazan Simohartono`;

exports.menu = [
{ slug: '/home', title: 'Home', icon: 'map'},
{ slug: '/blog', title: 'Blog', icon: 'map'},
{ slug: '/learn', title: 'Learn', icon: 'map'}
];