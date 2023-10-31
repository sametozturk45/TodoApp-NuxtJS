export const state = ()=>({
    items:[
        {
            id:1,
            name:'mdi-shopping',
            tags:{
                eng:["shop","shopping"],
                tr:["alışveriş","avm","çanta"],
            },
            defaultColor:'#870096',
            isDeleted:false
        },
        {
            id:2,
            name:'mdi-mail',
            tags:{
                eng:["note","mail","reminder"],
                tr:["not","not defteri","hatırlatma"],
            },
            defaultColor:'#1d76db',
            isDeleted:false
        },
        {
            id:3,
            name:'mdi-alarm',
            tags:{
                eng:["alarm","reminder"],
                tr:["alarm","çalar saat","hatırlatma"],
            },
            defaultColor:'#d11515',
            isDeleted:false
        },
        {
            id:4,
            name:'mdi-calendar',
            tags:{
                eng:["calendar","month","week","day"],
                tr:["takvim","gün","ay","yıl"],
            },
            defaultColor:'#a2d115',
            isDeleted:false
        },
        {
            id:4,
            name:'mdi-phone',
            tags:{
                eng:["phone","call"],
                tr:["telefon","arama"],
            },
            defaultColor:'#1515d1',
            isDeleted:false
        },
        {
            id:5,
            name:'mdi-map-marker',
            tags:{
                eng:["map","marker"],
                tr:["konum","harita"],
            },
            defaultColor:'#138a35',
            isDeleted:false
        }
    ],
    idCounter:5
})