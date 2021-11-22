import { Component, OnInit } from '@angular/core';
import { ProductSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { IndexDataServcies } from 'src/app/services/index/IndexDataService.service';
import { AppUrlsService } from 'src/app/services/shared/app-urls.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryDataService } from 'src/app/services/shoping-cart/category.service';

@Component({
    selector: 'app-ties',
    templateUrl: './ties.component.html',
    styleUrls: ['./ties.component.scss']
})
export class TiesComponent implements OnInit {

    public today: number = Date.now();
    public products = []
    public productCollections: any[] = [];
    public ProductSliderConfig: any = ProductSlider;
    public sliders = []
    listofSlider;
    pageSection;

    constructor(
        private IndexDataServcies: IndexDataServcies,
        private AppUrlsService: AppUrlsService,
        public productService: ProductService,
        private CategoryDataService: CategoryDataService,
        private _CategoryDataService: CategoryDataService,
        private router: Router,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {

        this.getAllCategory()
        this.getNewArrivalsproducts()
        this.getSlider()

    }

    productList;
    value: number = 100;
    Id;
    categoryCount;
    categoryList = []
    categoryProducts = []
    newArrivalItem = []

    getAllCategory() {
        this._CategoryDataService.getCategoryList().subscribe(res => {
            console.log('getCategory DB Data -->', res.body)
            let categoryData = JSON.parse(JSON.stringify(res.body));
            let catLenght = categoryData.length
            if (catLenght > 4) {
                catLenght = 4
            }
            for (let c = 0; c < catLenght; c++) {
                let category = {}
                category['products'] = []
                category['Id'] = categoryData[c]['Id']
                category['$id'] = categoryData[c]['$id']
                category['fld_Name'] = categoryData[c]['fld_Name']
                category['fld_UpdateAt'] = categoryData[c]['fld_UpdateAt']
                category['fld_CreateAt'] = categoryData[c]['fld_CreateAt']
                category['fld_Description'] = categoryData[c]['fld_Description']
                category['fld_Image'] = `${this.AppUrlsService.domain}/Images/Product/${categoryData[c]['fld_Image']}`
                let newProduct = JSON.parse(JSON.stringify(res.body[c]['tbl_gk_Product']));
                let newPLenght = newProduct.length
                if (newPLenght > 4) {
                    newPLenght = 4
                }
                for (let i = 0; i < newPLenght; i++) {
                    if (newProduct[i]['Id'] != undefined && newProduct[i]['fld_Name'] != undefined) {
                        let product = {}
                        product['id'] = newProduct[i]['Id']
                        product['title'] = newProduct[i]['fld_Name']
                        product['description'] = newProduct[i]['fld_Description']
                        product['type'] = "fashion"
                        product['brand'] = newProduct[i]['fld_Style']
                        product['collection'] = ["New Product"];
                        product['category'] = newProduct[i]['Id']
                        product['price'] = newProduct[i]['fld_Price']
                        product['sale'] = false
                        product['discount'] = 0
                        product['stock'] = newProduct[i]['fld_Quentity']
                        product['new'] = newProduct['fld_Option'] == 'New' ? true : false;
                        product['quantity'] = 0
                        product['rating']=this.getRatingNumber(newProduct[i]['tbl_gk_reviews'])
                        product['tags'] = [
                            "new",
                            "s",
                            "m",
                            "black",
                            "white",
                            "pink",
                            "nike"
                        ];
                        product['variants'] = [];
                        product['images'] = [];

                        let tags = {}
                        let variants = {}
                        variants['variant_id'] = i
                        variants['id'] = i
                        variants['sku'] = ""
                        variants['size'] = "s"
                        variants['color'] = newProduct[i]['fld_Color'] == "lilac" ? "violet" : newProduct[i]['fld_Color']
                        variants['image_id'] = i
                        let imageString: String = newProduct[i]['fld_Images']
                        let imageArray = imageString.split(",");
                        for (let j = 0; j < imageArray.length; j++) {
                            let images = {}
                            images['image_id'] = j
                            images['id'] = j
                            images['alt'] = newProduct[i]['fld_Name']
                            images['src'] = `${this.AppUrlsService.domain}/Images/Product/${imageArray[j]}`
                            images['variant_id'] = [i]
                            product['images'].push(images)
                        }

                        product['tags'].push(tags)
                        product['variants'].push(variants)
                        // product['images'].push(images)
                        category['products'].push(product)
                    }
                }
                this.categoryList.push(category)
            }
            console.log('getCategoryList', this.categoryList)
        })
    }

    getNewArrivalsproducts() {
        this.CategoryDataService.getLastNewArrival().subscribe(res => {
            console.log('New Arrival-->', res.body);
            let newProduct = JSON.parse(JSON.stringify(res.body));
            for (let i = 0; i < newProduct.length; i++) {
                if (newProduct[i]['Id'] != undefined && newProduct[i]['fld_Name'] != undefined) {
                    let product = {}
                    product['id'] = newProduct[i]['Id']
                    product['title'] = newProduct[i]['fld_Name']
                    product['description'] = newProduct[i]['fld_Description']
                    product['type'] = "fashion"
                    product['brand'] = newProduct[i]['fld_Style']
                    product['collection'] = ["New Product"];
                    product['category'] = newProduct[i]['Id']
                    product['price'] = newProduct[i]['fld_Price']
                    product['sale'] = false
                    product['discount'] = 0
                    product['stock'] = newProduct[i]['fld_Quentity']
                    product['new'] = newProduct['fld_Option'] == 'New' ? true : false;
                    product['quantity'] = 0
                    product['rating']=this.getRatingNumber(newProduct[i]['tbl_gk_reviews'])
                    product['tags'] = [
                        "new",
                        "s",
                        "m",
                        "black",
                        "white",
                        "pink",
                        "nike"
                    ];
                    product['variants'] = [];
                    product['images'] = [];

                    let tags = {}
                    let variants = {}
                    variants['variant_id'] = i
                    variants['id'] = i
                    variants['sku'] = ""
                    variants['size'] = "s"
                    variants['color'] = newProduct[i]['fld_Color'] == "lilac" ? "violet" : newProduct[i]['fld_Color']
                    variants['image_id'] = i
                    let imageString: String = newProduct[i]['fld_Images']
                    let imageArray = imageString.split(",");
                    for (let j = 0; j < imageArray.length; j++) {
                        let images = {}
                        images['image_id'] = j
                        images['id'] = j
                        images['alt'] = newProduct[i]['fld_Name']
                        images['src'] = `${this.AppUrlsService.domain}/Images/Product/${imageArray[j]}`
                        images['variant_id'] = [i]
                        product['images'].push(images)
                    }

                    product['tags'].push(tags)
                    product['variants'].push(variants)
                    this.newArrivalItem.push(product)
                }
            }

        })
    }

    getSlider() {
        this.IndexDataServcies.getSliderList().subscribe(res => {
            console.log(res.body);
            if (res.body != null) {
                let result = JSON.parse(JSON.stringify(res.body))
                for (let i = 0; i < result.length; i++) {
                    let product = {}
                    product['title'] = 'Welcome to Gk Direct'
                    product['subTitle'] = result[i]['Title']
                    product['image'] = `${this.AppUrlsService.domain}/Images/Slider/${result[i]['Image']}`
                    this.sliders.push(product)
                }
            } else {
                let product = {}
                product['title'] = 'Welcome to '
                product['subTitle'] = 'Gk Direct'
                product['image'] = 'assets/images/slider/1.jpg'
                this.sliders.push(product)
            }
        })
    }

    public collections = [{
        image: 'assets/images/collection/fashion/1.jpg',
        save: 'save 40%',
        title: '2020'
    }, {
        image: 'assets/images/collection/fashion/2.jpg',
        save: 'save 60%',
        title: 'Sell'
    }];

    // Product Tab collection
    getCollectionProducts(collection) {
        return this.products.filter((item) => {
            if (item.collection.find(i => i === collection)) {
                return item
            }
        })
    }

    getRatingNumber(data){
        let count=0
        let reviewNumber=0
        for (let i = 0; i < data.length; i++) {
            count=count+1
            reviewNumber= data[i]['reviewNumber'] + reviewNumber
         }
         let number=Math.round(reviewNumber/count)
        return number
    }

}
