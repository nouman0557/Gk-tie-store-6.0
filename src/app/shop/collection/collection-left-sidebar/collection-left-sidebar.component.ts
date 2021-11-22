import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ViewportScroller} from '@angular/common';
import {ProductService} from "../../../shared/services/product.service";
import {Product} from '../../../shared/classes/product';
import {IndexDataServcies} from 'src/app/services/index/IndexDataService.service';
import {AppUrlsService} from 'src/app/services/shared/app-urls.service';
import {CategoryDataService} from 'src/app/services/shoping-cart/category.service';

@Component({
    selector: 'app-collection-left-sidebar',
    templateUrl: './collection-left-sidebar.component.html',
    styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {

    public grid: string = 'col-xl-3 col-md-6';
    public layoutView: string = 'grid-view';
    public products: Product[] = [];
    public brands = [
        'Business', 'Classic', 'Luxury', 'Wedding'
    ]
    public colors: any[] = [];
    public size = ['Floral', 'Other', 'Paisley', 'Plain', 'PolkaDot', 'Striped']
    public width = ['Normal', 'Skinny']
    public material = ['Polyester', 'Silk', 'Wool']
    public option = ['Multibuy', 'MostPopular', 'New']
    public minPrice: number = 0;
    public maxPrice: number = 100;
    public tags: any[] = [];
    public category: string;
    public categoryId = 1
    public pageNo: number = 1;
    public paginate: any = {}; // Pagination use only
    public sortBy: string; // Sorting Order
    public mobileSidebar: boolean = false;
    public loader: boolean = true;
    selectedCategory = 'All'

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private viewScroller: ViewportScroller,
        public productService: ProductService,
        private AppUrlsService: AppUrlsService,
        private _CategoryDataService: CategoryDataService,
    ) {
        // Get Query params..
        this.route.queryParams.subscribe(params => {
            if (params.category != null && params.category != undefined) {
                let cate = params.category;
                this.products = []
                let array = cate.split(",")
                this.categoryId = array[0]
                this.selectedCategory = array[1]
                this.tiesFilters = {
                    Color: '',
                    Style: '',
                    Pattern: '',
                    Width: '',
                    Material: '',
                }
            }
            if (params.category != null && params.category != undefined) {
                let id = Number(this.categoryId)
                this._CategoryDataService.getCategoryProudct(id).subscribe(res => {
                    console.log("getCategoryProudct-->", res.body);
                    if (res.body != null) {
                        this.makeProductField(res.body)
                    }
                })
            } else {
                this.products=[]
                this.getAllCategory()
            }
            let id = Number(this.categoryId)
            this._CategoryDataService.getCategoryCountProudct(id).subscribe(res => {
                this.categoryCount = res.body;
                console.log("categoryCount-->", this.categoryCount)
            })
            this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
            this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
            this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
            this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
            this.pageNo = params.page ? params.page : this.pageNo;
        })
        
    }

    allCategory = []
    categoryCount

    ngOnInit(): void {
    }

    categoryList = []
    tempCatName = ''

    getAllCategory() {
        this._CategoryDataService.getCategoryList().subscribe(res => {
            console.log('getCategory DB Data -->', res.body)
            let categoryData = JSON.parse(JSON.stringify(res.body));
            // let length=1
            for (let c = 0; c < categoryData.length; c++) {
                let category = {}
                category['products'] = []
                category['Id'] = categoryData[c]['Id']
                category['$id'] = categoryData[c]['$id']
                category['fld_Name'] = categoryData[c]['fld_Name']
                if (c == 0) {
                    this.categoryId = categoryData[c]['Id']
                    this.selectedCategory = "All"
                    this.tempCatName = categoryData[c]['fld_Name']
                }
                category['fld_UpdateAt'] = categoryData[c]['fld_UpdateAt']
                category['fld_CreateAt'] = categoryData[c]['fld_CreateAt']
                category['fld_Description'] = categoryData[c]['fld_Description']
                category['fld_Image'] = `${this.AppUrlsService.domain}/Images/Product/${categoryData[c]['fld_Image']}`
                let newProduct = JSON.parse(JSON.stringify(res.body[c]['tbl_gk_Product']));
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
                        // product['images'].push(images)
                        this.products.push(product)
                    }
                }
                this.categoryList.push(category)
            }
            // Paginate Products
            this.paginate = this.productService.getPager(this.products.length, +this.pageNo);     // get paginate object from service
            this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
            console.log('getCategoryList', this.categoryList)
        })
    }

    tiesFilters = {
        Color: '',
        Style: '',
        Pattern: '',
        Width: '',
        Material: '',
    }

    appliedFilter(item) {
        if (!this.isObjectEmpty(this.tiesFilters)) {
            this.products = []
            this.selectedCategory = this.tempCatName
        }
        if (item.Color != undefined) {
            this.tiesFilters['Color'] = item.Color
            this.GetColorTies()
        } else if (item.Style != undefined) {
            this.tiesFilters['Style'] = item.Style
            this.GetStyleTies(this.tiesFilters['Style'], this.categoryCount[this.tiesFilters['Style']])
        } else if (item.Pattern != undefined) {
            this.tiesFilters['Pattern'] = item.Pattern
            this.GetPatternTies(this.tiesFilters['Pattern'], this.categoryCount[this.tiesFilters['Pattern']])
        } else if (item.Width != undefined) {
            this.tiesFilters['Width'] = item.Width
            this.GetWidthTies(this.tiesFilters['Width'], this.categoryCount[this.tiesFilters['Width']])
        } else {
            this.tiesFilters['Material'] = item.Material
            this.GetMatrialTies(this.tiesFilters['Material'], this.categoryCount[this.tiesFilters['Material']])
        }

    }

    appliedCatFilter(id){
        this.products=[]
        if(id=='All'){
            this.getAllCategory()
        }else{
            this._CategoryDataService.getCategoryProudct(id).subscribe(res => {
                console.log("getCategoryProudct-->", res.body);
                let result=res.body[0].tbl_gk_Category['tbl_gk_Product']
                if (result != null) {
                    this.makeProductField(result)
                }
            })
        }
    }

    updatePriceFilter(price) {
        this.priceChange(price.maxPrice)
    }

    // Append filter value to Url
    updateFilter(tags: any) {
        tags.page = null; // Reset Pagination
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: tags,
            queryParamsHandling: 'merge', // preserve the existing query params in the route
            skipLocationChange: false  // do trigger navigation
        }).finally(() => {
            this.viewScroller.setOffset([120, 120]);
            this.viewScroller.scrollToAnchor('products'); // Anchore Link
        });
    }

    // SortBy Filter
    sortByFilter(value) {
        this.sortBy=value
        if( this.sortBy!=''){
        this.products = this.productService.sortProducts(this.products, this.sortBy);
        }else{
            this.products = this.productService.sortProducts(this.products, 'ascending'); 
        }
        // this.router.navigate([], {
        //     relativeTo: this.route,
        //     queryParams: {sortBy: value ? value : null},
        //     queryParamsHandling: 'merge', // preserve the existing query params in the route
        //     skipLocationChange: false  // do trigger navigation
        // }).finally(() => {
        //     this.viewScroller.setOffset([120, 120]);
        //     this.viewScroller.scrollToAnchor('products'); // Anchore Link
        // });
    }

    // Remove Tag
    removeTag(item) {
        this.tiesFilters[item] = ''
        if (!this.isObjectEmpty(this.tiesFilters)) {
            this.products = []
            this.getAllCategory()
        }
    }

    // Clear Tags
    removeAllTags() {
        this.tiesFilters = {
            Color: '',
            Style: '',
            Pattern: '',
            Width: '',
            Material: '',
        }
        this.products = []
        this.getAllCategory()
    }

    GetColorTies() {
        let id = Number(this.categoryId)
        this._CategoryDataService.getFilterCategoryProudctByColor(id, this.tiesFilters['Color']).subscribe(res => {
            if (res.body != null) {
                this.makeProductField(res.body);
            }
        })
    }

    GetStyleTies(style, count) {
        if (count >= 0) {
            let id = Number(this.categoryId)
            this._CategoryDataService.getFilterCategoryProudctByStyle(id, style).subscribe(res => {
                if (res.body != null) {
                    this.products = []
                    this.makeProductField(res.body)
                }
            })
        }

    }

    GetPatternTies(pattern, count) {
        if (count > 0) {
            let id = Number(this.categoryId)
            this._CategoryDataService.getFilterCategoryProudctByPattern(id, pattern).subscribe(res => {
                if (res.body != null) {
                    this.products = []
                    this.makeProductField(res.body)
                }
            })
        }
    }

    GetWidthTies(width, count) {
        if (count > 0) {
            let id = Number(this.categoryId)
            this.products = []
            this._CategoryDataService.getFilterCategoryProudctByWidth(id, width).subscribe(res => {
                if (res.body != null) {
                    this.makeProductField(res.body)
                }
            })
        }
    }

    GetMatrialTies(matrial, count) {
        if (count > 0) {
            let id = Number(this.categoryId)
            this._CategoryDataService.getFilterCategoryProudctByMatrial(id, matrial).subscribe(res => {
                if (res.body != null) {
                    this.products = []
                    this.makeProductField(res.body)
                }
            })
        }

    }

    priceChange(price) {
        let id = Number(this.categoryId)
        this._CategoryDataService.getFilterCategoryProudctByPrice(id, price).subscribe(res => {
            if (res.body != null) {
                this.products = []
                this.makeProductField(res.body)
            }
        })
    }


    // product Pagination
    setPage(page: number) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {page: page},
            queryParamsHandling: 'merge', // preserve the existing query params in the route
            skipLocationChange: false  // do trigger navigation
        }).finally(() => {
            this.viewScroller.setOffset([120, 120]);
            this.viewScroller.scrollToAnchor('products'); // Anchore Link
        });
    }

    // Change Grid Layout
    updateGridLayout(value: string) {
        this.grid = value;
    }

    // Change Layout View
    updateLayoutView(value: string) {
        this.layoutView = value;
        if (value == 'list-view')
            this.grid = 'col-lg-12';
        else
            this.grid = 'col-xl-3 col-md-6';
    }

    // Mobile sidebar
    toggleMobileSidebar() {
        this.mobileSidebar = !this.mobileSidebar;
    }

    makeProductField(newProduct) {
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
                // product['images'].push(images)
                this.products.push(product)
            }
        }
       this.paginate = this.productService.getPager(this.products.length, +this.pageNo);
       this.products = this.products.slice(this.paginate.startIndex, this.paginate.endIndex + 1); 
    }

    isObjectEmpty(Obj) {
        for (var key in Obj) {
            if (Obj.hasOwnProperty(key))
                return false;
        }
        return true;
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
