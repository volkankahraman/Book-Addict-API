const axios = require('axios'),
    {
        JSDOM
    } = require('jsdom'),
    {
        Connection,
        sql
    } = require('./../database/connection');


function lowerCaseKeys(obj) {
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj = {}
    while (n--) {
        key = keys[n];
        newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
}

// let getBooKFromKitapyurdu = function (bookName) {
//     return new Promise((resolve, reject) => {
//             let aranan = encodeURI(bookName),
//                 url = `https://www.kitapyurdu.com/index.php?route=product/search&filter_name=${aranan}`;

//             console.time("kitapçekildi");
//             axios.get(url)
//                 .then(response => {
//                     const dom = new JSDOM(response.data),
//                         books = dom.window.document.querySelectorAll('div.image > div > a');
//                     if (books[0])
//                         axios.get(encodeURI(books[0].getAttribute('href'))).then(response => {
//                             const dom = new JSDOM(response.data),
//                                 book = {
//                                     Name: dom.window.document.querySelector('h1[itemprop=name]').innerHTML,
//                                     CoverPicturePath: (dom.window.document.querySelector('#image')) ? dom.window.document.querySelector('#image').getAttribute('src') : dom.window.document.querySelector('#front > img').getAttribute('src'),
//                                     Star: dom.window.document.querySelectorAll('.rating .rating .active').length,
//                                     Language: {
//                                         Language: "Turkish (Turkey)"
//                                     },
//                                     Authors: {
//                                         Fullname: dom.window.document.querySelector('[itemprop=author] [itemprop=url] [itemprop=name]').innerHTML
//                                     },
//                                     Categories: {
//                                         Name: dom.window.document.querySelector('div.product-info.grid_9.alpha > div:nth-child(3) > div.book-cover.box-shadow.mg-b-20 > div.grid_6.omega.alpha.book-right > div > div:nth-child(7) > a:nth-child(2)').innerHTML.split('</span>')[2]
//                                     },
//                                     PublicationInformation: {
//                                         ISBN: dom.window.document.querySelector('[itemprop=isbn]').innerHTML,
//                                         PublishYear: dom.window.document.querySelector('[itemprop=datePublished]').innerHTML.split("-")[0],
//                                         Publisher: {
//                                             Name: dom.window.document.querySelector('[itemprop=publisher] [itemprop=url] [itemprop=name]').innerHTML,
//                                         }
//                                     },

//                                     Description: dom.window.document.querySelector('[itemprop=description]').innerHTML,
//                                     NumberOfPages: parseInt(dom.window.document.querySelector('[itemprop=numberOfPages]').innerHTML),
//                                 };

//                             if (book) {
//                                 resolve(book);
//                             } else {
//                                 reject(Error("kitap çekilemedi"));
//                             }
//                         });
//                     console.timeEnd("kitapçekildi");

//                 })
//                 .catch(error => {
//                     reject(error);
//                 })

//         })
//         .catch(error => {
//             reject(error);
//         })
// }

// let getBook1000Kitap = function (bookUrl) {
//     return new Promise((resolve, reject) => {

//         console.time("kitapçekildi");
//         axios.get(bookUrl).then(response => {
//             const dom = new JSDOM(response.data);
//             let book = {
//                 Name: null,
//                 CoverPicturePath: dom.window.document.querySelector('div.ust > div.container > div.resim > img').getAttribute('src'),
//                 Authors: [],
//                 Categories: [],
//                 PublicationInformation: {},
//                 Language: {}
//             };

//             dom.window.document.querySelectorAll('div.ana-sag > div.kutu.bilgiler > .oge').forEach(elem => {
//                 const baslik = elem.querySelector('.baslik'),
//                     bilgi = elem.querySelector('.bilgi');
//                 if (baslik) {
//                     if (baslik.innerHTML == 'Adı:')
//                         book.Name = bilgi.innerHTML;
//                     if (baslik.innerHTML == 'Yazar:')
//                         book.Authors.push({
//                             fullname: bilgi.querySelector('a').innerHTML
//                         })
//                     if (baslik.innerHTML == 'ISBN:') {
//                         book.PublicationInformation.ISBN = bilgi.innerHTML
//                     }
//                     if (baslik.innerHTML == 'Baskı tarihi:') {
//                         const date = bilgi.innerHTML.split(' ')
//                         book.PublicationInformation.PublishYear = parseInt(date[date.length - 1])
//                     }
//                     if (baslik.innerHTML == 'Yayınevi:') {
//                         book.PublicationInformation.Publisher = bilgi.innerHTML
//                     }
//                     if (baslik.innerHTML == 'Sayfa sayısı:') {
//                         book.pageCount = bilgi.innerHTML;
//                     }
//                     if (baslik.innerHTML == 'Kitabın türü:') {
//                         book.Categories = Array.from(bilgi.querySelectorAll('a'), elem => elem.innerHTML)
//                     }
//                     if (baslik.innerHTML == 'Dil:') {
//                         Connection.then(pool => {
//                             return pool.request()
//                                 .input('language', sql.NVarChar(100), bilgi.innerHTML)
//                                 .execute('CheckAndInsertLanguage')
//                         }).then(result => {
//                             book.Language = result.recordset[0]
//                         }).catch(err => console.log(err));

//                     }
//                     book.Description = dom.window.document.querySelector('div:nth-child(6) > div.ana-orta > div:nth-child(2) > div.icerik > div > div').innerHTML.split('<br>')[0]


//                 }

//             })

//             // let date = dom.window.document.querySelector('div.ana-sag > div.kutu.bilgiler > div:nth-child(3) > div.bilgi').innerHTML.split(' ');

//             // let book = {
//             //     Name: dom.window.document.querySelector('div.ust > div.container > div.baslik > h1').innerHTML,
//             //     Authors: [{
//             //         Fullname: dom.window.document.querySelector('div.container > div.baslik > div > a').innerHTML,
//             //     }],
//             //     Language: {
//             //         Language: "Turkish (Turkey)"
//             //     },
//             //     PublicationInformation: {
//             //         ISBN: dom.window.document.querySelector('div.ana-sag > div.kutu.bilgiler > div:nth-child(6) > div.bilgi').innerHTML,
//             //         PublishYear: date[date.length - 1],
//             //         Publisher: dom.window.document.querySelector('div.ana-sag > div.kutu.bilgiler > div:nth-child(11) > div.bilgi').innerHTML
//             //     },
//             //     Categories: Array.from(dom.window.document.querySelectorAll('div.ana-sag > div.kutu.bilgiler > div:nth-child(7) > div.bilgi > a'), elem => elem.innerHTML),
//             //     CoverPicturePath: dom.window.document.querySelector('div.ust > div.container > div.resim > img').getAttribute('src'),
//             //     pageCount: dom.window.document.querySelector('div.ana-sag > div.kutu.bilgiler > div:nth-child(4) > div.bilgi').innerHTML,
//             //     Description: dom.window.document.querySelector('div:nth-child(6) > div.ana-orta > div:nth-child(2) > div.icerik > div > div').innerHTML.split('<br>')[0]
//             // }

//             if (book) {
//                 resolve(book);
//             } else {
//                 reject(Error("kitaplar çekilemedi"));
//             }
//         });
//         console.timeEnd("kitapçekildi");
//     })
// }
// let arr = ["https://1000kitap.com/kitap/kurk-mantolu-madonna--557", "https://1000kitap.com/kitap/kucuk-prens--624", "https://1000kitap.com/kitap/satranc--1103", "https://1000kitap.com/kitap/donusum--1310", "https://1000kitap.com/kitap/simyaci--104", "https://1000kitap.com/kitap/seker-portakali--239", "https://1000kitap.com/kitap/ucurtma-avcisi--119", "https://1000kitap.com/kitap/hayvan-ciftligi--147", "https://1000kitap.com/kitap/bilinmeyen-bir-kadinin-mektubu--6159", "https://1000kitap.com/kitap/fareler-ve-insanlar--566", "https://1000kitap.com/kitap/suc-ve-ceza--121", "https://1000kitap.com/kitap/kuyucakli-yusuf--543", "https://1000kitap.com/kitap/1984--100", "https://1000kitap.com/kitap/insan-neyle-yasar--174", "https://1000kitap.com/kitap/olasiliksiz--102", "https://1000kitap.com/kitap/icimizdeki-seytan--562", "https://1000kitap.com/kitap/serenad--244", "https://1000kitap.com/kitap/calikusu--236", "https://1000kitap.com/kitap/bin-muhtesem-gunes--120", "https://1000kitap.com/kitap/ask--131", "https://1000kitap.com/kitap/yabanci--2991", "https://1000kitap.com/kitap/olaganustu-bir-gece--48832", "https://1000kitap.com/kitap/dokuzuncu-hariciye-kogusu--373", "https://1000kitap.com/kitap/sefiller--172", "https://1000kitap.com/kitap/kardesimin-hikayesi--4922", "https://1000kitap.com/kitap/yeraltindan-notlar--125", "https://1000kitap.com/kitap/bir-kadinin-yasamindan-yirmi-dort-saat--8057", "https://1000kitap.com/kitap/huzursuzluk--71260", "https://1000kitap.com/kitap/sol-ayagim--882", "https://1000kitap.com/kitap/marti-jonathan-livingston--1952", "https://1000kitap.com/kitap/genc-wertherin-acilari--1648", "https://1000kitap.com/kitap/amok-kosucusu--1162", "https://1000kitap.com/kitap/korku--28343", "https://1000kitap.com/kitap/beyaz-zambaklar-ulkesi--187", "https://1000kitap.com/kitap/otomatik-portakal--5909", "https://1000kitap.com/kitap/da-vinci-sifresi--639", "https://1000kitap.com/kitap/fahrenheit-451--1687", "https://1000kitap.com/kitap/piraye--1520", "https://1000kitap.com/kitap/beyaz-dis--856", "https://1000kitap.com/kitap/sineklerin-tanrisi--269", "https://1000kitap.com/kitap/bulbulu-oldurmek--939", "https://1000kitap.com/kitap/kirmizi-pazartesi--1364", "https://1000kitap.com/kitap/yuregim-seni-cok-sevdi--1490", "https://1000kitap.com/kitap/semerkant--193", "https://1000kitap.com/kitap/tutunamayanlar--130", "https://1000kitap.com/kitap/aklindan-bir-sayi-tut--51", "https://1000kitap.com/kitap/beyaz-gemi--820", "https://1000kitap.com/kitap/cavdar-tarlasinda-cocuklar--1855", "https://1000kitap.com/kitap/aylak-adam--1091", "https://1000kitap.com/kitap/melekler-ve-seytanlar--182", "https://1000kitap.com/kitap/od--246", "https://1000kitap.com/kitap/bir-cokusun-oykusu--73466", "https://1000kitap.com/kitap/ali-algur--232", "https://1000kitap.com/kitap/milenaya-mektuplar--1549", "https://1000kitap.com/kitap/bogurtlen-kisi--13427", "https://1000kitap.com/kitap/korluk--1185", "https://1000kitap.com/kitap/empati--173", "https://1000kitap.com/kitap/bir-idam-mahkumunun-son-gunu--2370", "https://1000kitap.com/kitap/denemeler--1395", "https://1000kitap.com/kitap/gurur-ve-onyargi--1654", "https://1000kitap.com/kitap/toprak-ana--866", "https://1000kitap.com/kitap/harry-potter-ve-felsefe-tasi--2267", "https://1000kitap.com/kitap/nietzsche-agladiginda--792", "https://1000kitap.com/kitap/senden-once-ben--4744", "https://1000kitap.com/kitap/fatih-harbiye--1078", "https://1000kitap.com/kitap/aclik-oyunlari--233", "https://1000kitap.com/kitap/bab-i-esrar--175", "https://1000kitap.com/kitap/beyaz-geceler--123", "https://1000kitap.com/kitap/kirmizi-sacli-kadin--53540", "https://1000kitap.com/kitap/ermis--852", "https://1000kitap.com/kitap/fedailerin-kalesi-alamut--65", "https://1000kitap.com/kitap/yaban--1692", "https://1000kitap.com/kitap/cesur-yeni-dunya--1057", "https://1000kitap.com/kitap/kumarbaz--126", "https://1000kitap.com/kitap/serguzest--351", "https://1000kitap.com/kitap/sah-ve-sultan--103", "https://1000kitap.com/kitap/gun-olur-asra-bedel--1577", "https://1000kitap.com/kitap/istanbul-hatirasi--300", "https://1000kitap.com/kitap/ince-memed-1--929", "https://1000kitap.com/kitap/sofienin-dunyasi--161", "https://1000kitap.com/kitap/puslu-kitalar-atlasi--1033", "https://1000kitap.com/kitap/son-ada--692", "https://1000kitap.com/kitap/beyoglunun-en-guzel-abisi--13011", "https://1000kitap.com/kitap/momo--3574", "https://1000kitap.com/kitap/iki-sehrin-hikayesi--865", "https://1000kitap.com/kitap/alacakaranlik--1590", "https://1000kitap.com/kitap/veronika-olmek-istiyor--1655", "https://1000kitap.com/kitap/ay-isigi-sokagi--20522", "https://1000kitap.com/kitap/vadideki-zambak--1421", "https://1000kitap.com/kitap/yuzyillik-yalnizlik--1356", "https://1000kitap.com/kitap/eylul--374", "https://1000kitap.com/kitap/hayvanlardan-tanrilara-sapiens--29637", "https://1000kitap.com/kitap/sokratesin-savunmasi--1582", "https://1000kitap.com/kitap/martin-eden--1614", "https://1000kitap.com/kitap/bir-psikiyatristin-gizli-defteri--3233", "https://1000kitap.com/kitap/insanciklar--495", "https://1000kitap.com/kitap/yaprak-dokumu--867", "https://1000kitap.com/kitap/cehennem--5351", "https://1000kitap.com/kitap/sirca-kosk--560", "https://1000kitap.com/kitap/mutluluk--1788", "https://1000kitap.com/kitap/babalar-ve-ogullar--138", "https://1000kitap.com/kitap/saatleri-ayarlama-enstitusu--1196", "https://1000kitap.com/kitap/ayni-yildizin-altinda--7145", "https://1000kitap.com/kitap/hasretinden-prangalar-eskittim--703", "https://1000kitap.com/kitap/ve-daglar-yankilandi--11450", "https://1000kitap.com/kitap/acimak--237", "https://1000kitap.com/kitap/harry-potter-ve-sirlar-odasi--2268", "https://1000kitap.com/kitap/su-cilgin-turkler--892", "https://1000kitap.com/kitap/en-son-yurekler-olur--1522", "https://1000kitap.com/kitap/bukre--11798", "https://1000kitap.com/kitap/kucuk-kara-balik--2282", "https://1000kitap.com/kitap/boyle-soyledi-zerdust--241", "https://1000kitap.com/kitap/atesi-yakalamak--625", "https://1000kitap.com/kitap/iskender--199", "https://1000kitap.com/kitap/intibah--350", "https://1000kitap.com/kitap/fakat-muzeyyen-bu-derin-bir-tutku--25729", "https://1000kitap.com/kitap/ana--827", "https://1000kitap.com/kitap/beyoglu-rapsodisi--293", "https://1000kitap.com/kitap/eroinle-dans--1521", "https://1000kitap.com/kitap/degirmen--553", "https://1000kitap.com/kitap/sevda-sozleri--627", "https://1000kitap.com/kitap/mart-menekseleri--3702", "https://1000kitap.com/kitap/katre-i-matem--406", "https://1000kitap.com/kitap/mecburiyet--71897", "https://1000kitap.com/kitap/nutuk--2582", "https://1000kitap.com/kitap/alayci-kus--302", "https://1000kitap.com/kitap/bir-genc-kizin-gizli-defteri--1877", "https://1000kitap.com/kitap/askin-gozyaslari-1-tebrizli-sems--62", "https://1000kitap.com/kitap/harry-potter-ve-azkaban-tutsagi--2269", "https://1000kitap.com/kitap/dijital-kale--691", "https://1000kitap.com/kitap/romeo-ve-juliet--4586", "https://1000kitap.com/kitap/fi--8158", "https://1000kitap.com/kitap/kasagi--2516", "https://1000kitap.com/kitap/dorian-grayin-portresi--361", "https://1000kitap.com/kitap/bir-delinin-ani-defteri-palto-burun-petersburg-oykuleri-ve-fayton--9537", "https://1000kitap.com/kitap/ferrarisini-satan-bilge--2586", "https://1000kitap.com/kitap/goge-bakma-duragi--14191", "https://1000kitap.com/kitap/nar-agaci--1584", "https://1000kitap.com/kitap/masumiyet-muzesi--128", "https://1000kitap.com/kitap/yeniay--1591", "https://1000kitap.com/kitap/bir-omur-nasil-yasanir--149700", "https://1000kitap.com/kitap/adi-aylin--1265", "https://1000kitap.com/kitap/siddhartha--3554", "https://1000kitap.com/kitap/anna-karenina--357", "https://1000kitap.com/kitap/tehlikeli-oyunlar--550", "https://1000kitap.com/kitap/hamlet--1651", "https://1000kitap.com/kitap/bir-cift-yurek--148", "https://1000kitap.com/kitap/su-hortumlu-dunyada-fil-yalniz-bir-hayvandir--2562", "https://1000kitap.com/kitap/safak-vakti--1594", "https://1000kitap.com/kitap/madame-bovary--874", "https://1000kitap.com/kitap/dogunun-limanlari--518", "https://1000kitap.com/kitap/anayurt-oteli--1094", "https://1000kitap.com/kitap/tutulma--1593", "https://1000kitap.com/kitap/babilde-olum-istanbulda-ask--183", "https://1000kitap.com/kitap/incir-kuslari--640", "https://1000kitap.com/kitap/kayip-sembol--1712", "https://1000kitap.com/kitap/inci--576", "https://1000kitap.com/kitap/yakici-sir--45287", "https://1000kitap.com/kitap/palto--17671", "https://1000kitap.com/kitap/harry-potter-ve-ates-kadehi--2270", "https://1000kitap.com/kitap/gazap-uzumleri--575", "https://1000kitap.com/kitap/araba-sevdasi--375", "https://1000kitap.com/kitap/patasana--291", "https://1000kitap.com/kitap/baslangic--87907", "https://1000kitap.com/kitap/uzun-hikaye--1182", "https://1000kitap.com/kitap/baba-ve-pic--257", "https://1000kitap.com/kitap/yagmur-sonrasi--6013", "https://1000kitap.com/kitap/kinyas-ve-kayra--3193", "https://1000kitap.com/kitap/soguk-kahve--8153", "https://1000kitap.com/kitap/ruh-adam--1814", "https://1000kitap.com/kitap/robinson-crusoe--1895", "https://1000kitap.com/kitap/kayip-gul--470", "https://1000kitap.com/kitap/karamazov-kardesler--497", "https://1000kitap.com/kitap/leylanin-evi--1764", "https://1000kitap.com/kitap/kucuk-mucizeler-dukkani--881", "https://1000kitap.com/kitap/sultani-oldurmek--95", "https://1000kitap.com/kitap/yureginin-goturdugu-yere-git--709", "https://1000kitap.com/kitap/yasli-adam-ve-deniz--1618", "https://1000kitap.com/kitap/aclik--101", "https://1000kitap.com/kitap/kor-baykus--1099", "https://1000kitap.com/kitap/gunesi-uyandiralim--3198", "https://1000kitap.com/kitap/kendine-ait-bir-oda--1550", "https://1000kitap.com/kitap/don-quijote--3220", "https://1000kitap.com/kitap/kirlangic-cigligi--101378", "https://1000kitap.com/kitap/ci--21244", "https://1000kitap.com/kitap/babaya-mektup--4088", "https://1000kitap.com/kitap/harry-potter-ve-zumruduanka-yoldasligi--2271", "https://1000kitap.com/kitap/posta-kutusundaki-mizika--1671", "https://1000kitap.com/kitap/olu-ozanlar-dernegi--1339", "https://1000kitap.com/kitap/cile--2164", "https://1000kitap.com/kitap/kuslar-yasina-gider--66847", "https://1000kitap.com/kitap/yuzbasinin-kizi--903", "https://1000kitap.com/kitap/cocuk-kalbi--8709", "https://1000kitap.com/kitap/notre-damein-kamburu--1612", "https://1000kitap.com/kitap/aforizmalar--9319", "https://1000kitap.com/kitap/seksen-gunde-dunya-gezisi--2146", "https://1000kitap.com/kitap/cemile--1988", "https://1000kitap.com/kitap/az--2451", "https://1000kitap.com/kitap/savas-sanati--2972", "https://1000kitap.com/kitap/kizil-nehirler--860", "https://1000kitap.com/kitap/devlet--325", "https://1000kitap.com/kitap/benim-huzunlu-orospularim--1358", "https://1000kitap.com/kitap/sinekli-bakkal--7361", "https://1000kitap.com/kitap/harry-potter-ve-melez-prens--3196", "https://1000kitap.com/kitap/mai-ve-siyah--1686", "https://1000kitap.com/kitap/olu-canlar--1923", "https://1000kitap.com/kitap/koku--1615", "https://1000kitap.com/kitap/ruhi-mucerret--3492", "https://1000kitap.com/kitap/huzur-sokagi--99", "https://1000kitap.com/kitap/vahsetin-cagrisi--5052", "https://1000kitap.com/kitap/ugultulu-tepeler--1261", "https://1000kitap.com/kitap/havvanin-uc-kizi--62016", "https://1000kitap.com/kitap/agridagi-efsanesi--935", "https://1000kitap.com/kitap/ihanet-noktasi--1640", "https://1000kitap.com/kitap/ince-memed-2--930", "https://1000kitap.com/kitap/on-kucuk-zenci--2549", "https://1000kitap.com/kitap/gozlerini-simsiki-kapat--744", "https://1000kitap.com/kitap/savas-ve-baris--181", "https://1000kitap.com/kitap/bu-ulke--1778", "https://1000kitap.com/kitap/harry-potter-ve-olum-yadigarlari--3686", "https://1000kitap.com/kitap/veda--2322", "https://1000kitap.com/kitap/pi--39848", "https://1000kitap.com/kitap/bir-kedi-bir-adam-bir-olum--921", "https://1000kitap.com/kitap/bilinmeyen-adanin-oykusu--7103", "https://1000kitap.com/kitap/korkuyu-beklerken--548", "https://1000kitap.com/kitap/her-sey-seninle-baslar--189", "https://1000kitap.com/kitap/oliver-twist--1274", "https://1000kitap.com/kitap/monte-cristo-kontu--876", "https://1000kitap.com/kitap/altinci-kogus--8573", "https://1000kitap.com/kitap/atesten-gomlek--545", "https://1000kitap.com/kitap/budala--488", "https://1000kitap.com/kitap/leyla-ile-mecnun--104287", "https://1000kitap.com/kitap/taassuk-i-talat-ve-fitnat--3010", "https://1000kitap.com/kitap/grinin-elli-tonu--3682", "https://1000kitap.com/kitap/ivan-ilyicin-olumu--380", "https://1000kitap.com/kitap/efsane--2599", "https://1000kitap.com/kitap/butun-siirleri--6630", "https://1000kitap.com/kitap/daragacinda-uc-fidan--2076", "https://1000kitap.com/kitap/dublorun-dilemmasi--1604", "https://1000kitap.com/kitap/bulanti--1154", "https://1000kitap.com/kitap/kiralik-konak--1694", "https://1000kitap.com/kitap/sis-ve-gece--196", "https://1000kitap.com/kitap/sabah-uykum--12268", "https://1000kitap.com/kitap/dortlukler--7901", "https://1000kitap.com/kitap/mavi-sacli-kiz--1945", "https://1000kitap.com/kitap/osmancik--1526", "https://1000kitap.com/kitap/cerrah--112", "https://1000kitap.com/kitap/son-kamelya--18907", "https://1000kitap.com/kitap/yusuf-ile-zuleyha--918", "https://1000kitap.com/kitap/fisilti--55", "https://1000kitap.com/kitap/oblomov--1247", "https://1000kitap.com/kitap/siyah-kan--1635", "https://1000kitap.com/kitap/dokuza-kadar-on--18540", "https://1000kitap.com/kitap/felatun-bey-ile-rakim-efendi--1735", "https://1000kitap.com/kitap/mustafa-kemal--125137", "https://1000kitap.com/kitap/ejderha-dovmeli-kiz--386", "https://1000kitap.com/kitap/iki-dirhem-bir-cekirdek--419", "https://1000kitap.com/kitap/ustam-ve-ben--14593", "https://1000kitap.com/kitap/utopia--1734", "https://1000kitap.com/kitap/henuz-vakit-varken-gulum--3427", "https://1000kitap.com/kitap/ahlar-agaci--19456", "https://1000kitap.com/kitap/elif-gibi-sevmek-1--18361", "https://1000kitap.com/kitap/benim-adim-kirmizi--279", "https://1000kitap.com/kitap/kafes--41730", "https://1000kitap.com/kitap/alice-harikalar-diyarinda--7828", "https://1000kitap.com/kitap/konstantiniyye-oteli--34618", "https://1000kitap.com/kitap/kavim--296", "https://1000kitap.com/kitap/askin-gozyaslari-2-hz-mevlana--58", "https://1000kitap.com/kitap/ask-kopekliktir--294", "https://1000kitap.com/kitap/yedi-guzel-adam--21348", "https://1000kitap.com/kitap/la-sonsuzluk-hecesi--1583", "https://1000kitap.com/kitap/itiraflarim--2806", "https://1000kitap.com/kitap/arkadaslar-arasinda--2542", "https://1000kitap.com/kitap/cizgili-pijamali-cocuk--8959", "https://1000kitap.com/kitap/murebbiye--56105", "https://1000kitap.com/kitap/delifisek--3576", "https://1000kitap.com/kitap/canim-aliye-ruhum-filiz--15322", "https://1000kitap.com/kitap/trendeki-kiz--30812", "https://1000kitap.com/kitap/golgesizler--3355", "https://1000kitap.com/kitap/ikigai-japonlarin-uzun-ve-mutlu-yasam-sirri--94879", "https://1000kitap.com/kitap/sevdalinka--1266", "https://1000kitap.com/kitap/iz--1766", "https://1000kitap.com/kitap/erken-kaybedenler--708", "https://1000kitap.com/kitap/leylim-leylim--12905", "https://1000kitap.com/kitap/bir-bilim-adaminin-romani-mustafa-inan--544", "https://1000kitap.com/kitap/yalniziz--1245", "https://1000kitap.com/kitap/vatan-yahut-silistre--3428", "https://1000kitap.com/kitap/kafamda-bir-tuhaflik--25226", "https://1000kitap.com/kitap/macbeth--27205", "https://1000kitap.com/kitap/uvercinka--16360", "https://1000kitap.com/kitap/nefes-nefese--1759", "https://1000kitap.com/kitap/mutlu-prens--363", "https://1000kitap.com/kitap/lavinia--30074", "https://1000kitap.com/kitap/ask-i-memnu--1646", "https://1000kitap.com/kitap/dirilis--382", "https://1000kitap.com/kitap/leyleklerin-ucusu--1634", "https://1000kitap.com/kitap/deli-kurt--6081", "https://1000kitap.com/kitap/yas-on-yedi--2149", "https://1000kitap.com/kitap/siyah-sut--258", "https://1000kitap.com/kitap/the-secret-sir--1768"];

// arr.forEach(elem => {
//     getBook1000Kitap(elem).then(items => {
//             console.log(items);
//         })
//         .catch(err => {
//             console.log(err);
//         })
// })



// let getBooKFromAPI = function (bookName) {
//     return new Promise((resolve, reject) => {
//         let aranan = encodeURI(bookName),
//             url = `https://www.googleapis.com/books/v1/volumes?q=${aranan}`;
//         axios.get(url)
//             .then(response => {
//                 let data = response.data.items[0].volumeInfo;
//                 book = {
//                     Name: data.title,
//                     CoverPicturePath: data.imageLinks.thumbnail,
//                     Star: 0,
//                     Language: {
//                         Language: "Turkish (Turkey)"
//                     },
//                     Authors: {
//                         Fullname: (data.authors) ? data.authors[0] : undefined
//                     },
//                     Categories: {
//                         Name: (data.categories) ? data.categories[0] : undefined
//                     },
//                     PublicationInformation: {
//                         ISBN: (data.industryIdentifiers) ? data.industryIdentifiers[1].identifier : undefined,
//                         PublishYear: (data.publishedDate) ? data.publishedDate.split('-')[0] : undefined,
//                         Publisher: {
//                             Name: data.publisher,
//                         }
//                     },

//                     Description: data.description,
//                     NumberOfPages: data.pageCount
//                 };
//                 console.log(book);

//                 if (book)
//                     resolve(book)
//                 else
//                     reject(Error("kitap çekilemedi"))

//             })
//             .catch(error => {
//                 reject(error);
//             })
//     })
// }

module.exports = {
    lowerCaseKeys
    // getBooKFromKitapyurdu,
    // getBooKFromAPI
}