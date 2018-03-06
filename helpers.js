const fs = require('fs');

exports.dump = (obj) => JSON.stringify(obj, null, 2);

exports.moment = require('moment');

exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`)

exports.siteName = `Arif Mafazan Simohartono`;

exports.menu = [
{ slug: '/', title: 'Home', icon: 'map'},
{ slug: '/blog', title: 'Blog', icon: 'map'},
{ slug: '/learn', title: 'Learn', icon: 'map'},
{ slug: '/portofolio', title: 'My Portofolio', icon: 'map'}
];