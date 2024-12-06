<template>

    <div class="intro-section custom-owl-carousel" id="home-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 mr-auto" style="margin-top: 100px">
                    <div class="owl-carousel slide-one-item-alt-text">


                        <div class="slide-text">
                            <h1 :style="styleObject">{{ results.title }}</h1>
                            <p class="mb-5" id="desc">
                                {{ results.description }}
                            </p>
                            <p>
                                <a :href="Apk.link" target="_blank" class="btn btn_apk py-3 px-5" :style="{color:fontColor,'margin-top':10+'px'}">
                                    Download Wallpapper
                                </a>
                                <a :href="'/WallpapperPrev/' + results.pdf_prev" target="_blank"
                                    class="btn  py-3 px-5 btn_apk" :style="{color:fontColor,'margin-top':10+'px'}" >
                                    Download Preview
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 ml-auto" data-aos-delay="100" style="margin-top: 100px">
                    <div class="owl-carousel slide-one-item-alt">
                        <img v-bind:src="image" alt="Image" class="img-fluid" />
                    </div>

                    <!-- <div class="owl-custom-direction">
                        <a href="#" class="custom-prev"><span class="icon-keyboard_arrow_left"></span></a>
                        <a href="#" class="custom-next"><span class="icon-keyboard_arrow_right"></span></a>
                    </div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="site-section section-2" style="padding-top: 50px;" id="more-Wallpappers">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 mb-5">
                    <h2 class="section-title">MORE WallpapperS</h2>
                    <p>There are more Wallpappers in our app such as :</p>
                </div>
            </div>

        </div>


        <div class="container">
            <div class="row">
                <div v-for="Wallpapper in Wallpappers " class="col-3">
                    <a class="work-thumb" :href="'http://' + this.host + '/Wallpapper/' + Wallpapper.id" >
                        <div class="work-text ">
                            <h3>{{ Wallpapper.title }}</h3>
                        </div>
                        <img v-bind:src="'http://' + this.host + '/' + Wallpapper.image" alt="Image" class="img-fluid">
                    </a>
                </div>
            </div>
        </div>
  
    </div>
</template>

<script>

export default {
    props: ['Wallpapperid'],
    data() {
        return {
            loading: false,
            results: [],
            Wallpappers: [],
            Apk: [],
            host: location.host,
            image: '',
            styleObject: '',
            fontColor: '',
        };
    },
    methods: {
        GetData: function () {
            axios.get("/api/getWallpapper", { params: { id: this.Wallpapperid } })
                .then((response) => {
                    this.results = response.data.Wallpapper;

                    this.image = 'http://' + this.host + '/storage/images/' + this.results.image;
                    this.ChangeCss();
                    this.GetAllWallpappers();

                });
        },
        ChangeCss: function () {
            axios.get("/api/getColor", { params: { id: this.results.apk_id } })
                .then((response) => {
                    this.Apk = response.data.Apk;
                    var style = document.querySelector(".intro-section").style
                    style.setProperty('--background', this.Apk.background_color);
                    this.styleObject = {
                        color: this.Apk.title_color,
                    }
                    this.fontColor = this.Apk.title_color ;
                });

        },
        GetAllWallpappers: function () {
            axios.get("/api/allWallpappers", { params: { cat: this.results.apk_id, itms: 4, page:  Math.floor(Math.random() * (2 - 1 + 1)) + 1 } })
                .then((response) => {
                    this.Wallpappers = response.data.Wallpappers;
                });

        }

    },
    created() {
        this.GetData();
    },

    mounted() {

    }
};
</script>
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

</style>