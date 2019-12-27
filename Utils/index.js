const axios = require('axios'),
    {
        JSDOM
    } = require('jsdom');


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

let getBooKFromKitapyurdu = function (bookName) {
    return new Promise((resolve, reject) => {
            let aranan = encodeURI(bookName),
                url = `https://www.kitapyurdu.com/index.php?route=product/search&filter_name=${aranan}`;

            console.time("kitapçekildi");
            axios.get(url)
                .then(response => {
                    const dom = new JSDOM(response.data),
                        books = dom.window.document.querySelectorAll('div.image > div > a');
                    if (books[0])
                        axios.get(encodeURI(books[0].getAttribute('href'))).then(response => {
                            const dom = new JSDOM(response.data),
                                book = {
                                    Name: dom.window.document.querySelector('h1[itemprop=name]').innerHTML,
                                    CoverPicturePath: (dom.window.document.querySelector('#image')) ? dom.window.document.querySelector('#image').getAttribute('src') : dom.window.document.querySelector('#front > img').getAttribute('src'),
                                    Star: dom.window.document.querySelectorAll('.rating .rating .active').length,
                                    Language: {
                                        Language: "Turkish (Turkey)"
                                    },
                                    Authors: {
                                        Fullname: dom.window.document.querySelector('[itemprop=author] [itemprop=url] [itemprop=name]').innerHTML
                                    },
                                    Categories: {
                                        Name: dom.window.document.querySelector('div.product-info.grid_9.alpha > div:nth-child(3) > div.book-cover.box-shadow.mg-b-20 > div.grid_6.omega.alpha.book-right > div > div:nth-child(7) > a:nth-child(2)').innerHTML.split('</span>')[2]
                                    },
                                    PublicationInformation: {
                                        ISBN: dom.window.document.querySelector('[itemprop=isbn]').innerHTML,
                                        PublishYear: dom.window.document.querySelector('[itemprop=datePublished]').innerHTML.split("-")[0],
                                        Publisher: {
                                            Name: dom.window.document.querySelector('[itemprop=publisher] [itemprop=url] [itemprop=name]').innerHTML,
                                        }
                                    },

                                    Description: dom.window.document.querySelector('[itemprop=description]').innerHTML,
                                    NumberOfPages: parseInt(dom.window.document.querySelector('[itemprop=numberOfPages]').innerHTML),
                                };

                            if (book) {
                                resolve(book);
                            } else {
                                reject(Error("kitap çekilemedi"));
                            }
                        });
                    console.timeEnd("kitapçekildi");

                })
                .catch(error => {
                    reject(error);
                })

        })
        .catch(error => {
            reject(error);
        })
}

module.exports = {
    lowerCaseKeys,
    getBooKFromKitapyurdu
}