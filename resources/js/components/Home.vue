<template>

  <!-- ======= Mobile nav toggle button ======= -->
  <!-- <button type="button" class="mobile-nav-toggle d-xl-none"><i class="bi bi-list mobile-nav-toggle"></i></button> -->
  <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>
  <!-- ======= Header ======= -->
  <header id="header" class="d-flex flex-column justify-content-center">

    <nav id="navbar" class="navbar nav-menu">
      <ul>
        <li><a href="#hero" class="nav-link scrollto active"><i class="bx bx-home"></i> <span>Home</span></a></li>
        <li><a href="#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a></li>
        <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-Wallpapper-content"></i> <span>Products</span></a>
        </li>
        <li><a href="#contact" class="nav-link scrollto"><i class="bx bx-envelope"></i> <span>Contact</span></a></li>
      </ul>
    </nav><!-- .nav-menu -->

  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex flex-column justify-content-center">
    <div class="container mt-5" data-aos="zoom-in" data-aos-delay="100" >
      <!-- <vue-typed-js :strings="['First text', 'Second Text']">
        <h1 class="typing"></h1>
      </vue-typed-js> -->
      <h1 :style="titleStyle">Our Applications </h1>
      <p><span class="typed" :style="titleStyle"></span></p>
      <div class="social-links">
        <a v-for="social in socials"  :href="social.link" :class="[social.socila_media]"><i :class="['bxl-'+social.socila_media,'bx']"></i></a>
        <!-- <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
        <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
        <a href="#" class="google-plus"><i class="bx bxl-skype"></i></a>
        <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a> -->
      </div>
    </div>
  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= About Section ======= -->
    <section id="about" class="about">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>About</h2>
          <p>{{about}}</p>
        </div>
      </div>
    </section><!-- End About Section -->

    <!-- ======= Facts Section ======= -->
    <section id="facts" class="facts">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Facts</h2>
          <p>{{facts}}</p>
        </div>

        <div class="row">

          <div class="col-lg-3 col-md-6">
            <div class="count-box" style="padding-top:55px">
              <i class="bi bi-Wallpapper"></i>
              <VueJsCounter v-if="count" start="1" v-bind:end="sumWallpappers + 1" duration="10000" class="mt-2" style="font-size: 30px;font-weight: 600;">0</VueJsCounter>
              <h4 >Wallpappers</h4>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-5 mt-md-0">
            <div class="count-box" style="padding-top:55px">
              <i class="bi bi-Wallpappermark-check"></i>
              <VueJsCounter v-if="count" start="1" v-bind:end="sumapk_users + 1" duration="10000" class="mt-2" style="font-size: 30px;font-weight: 600;">0</VueJsCounter>

              <h4 >apk_users</h4>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div class="count-box" style="padding-top:55px">
              <i class="bi bi-newspaper"></i>
              <VueJsCounter v-if="count" start="1" v-bind:end="sumposts + 1" duration="10000" class="mt-2" style="font-size: 30px;font-weight: 600;"></VueJsCounter>

              <h4 >Posts</h4>
            </div>
          </div>

          <div class="col-lg-3 col-md-6 mt-5 mt-lg-0">
            <div class="count-box" style="padding-top:55px">
              <i class="bi bi-play-btn"></i>
              <VueJsCounter v-if="count" start="1" v-bind:end="sumcourses + 1" duration="10000" class="mt-2" style="font-size: 30px;font-weight: 600;"></VueJsCounter>

              <h4 >Courses</h4>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Facts Section -->


    <!-- ======= Portfolio Section ======= -->
    <section id="portfolio" class="portfolio section-bg">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Products</h2>
          <p>{{products}}</p>
        </div>

        <div class="row">
          <div class="col-lg-12 d-flex justify-content-center" data-aos="fade-up" data-aos-delay="100">
            <ul id="portfolio-flters">
              <li data-filter="*" class="filter-active">Apps</li>
              <li data-filter=".filter-app">App</li>
              <li data-filter=".filter-Wallpappers">Wallpappers</li>
            </ul>
          </div>
        </div>

        <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="200">

          <div v-for=" cat in cats " class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img :src="'http://' + this.host + '/storage/apks/' + cat.display_image" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h3>{{cat.title}}</h3>
                <h4>- APK</h4>
              </div>
            </div>
          </div>

     
          <div v-for="Wallpapper in Wallpappers "  class="col-lg-4 col-md-6 portfolio-item filter-Wallpappers">
            <a :href="'http://' + this.host + '/Wallpapper/' + Wallpapper.id">
            <div class="portfolio-wrap">
              <img :src="'http://' + this.host + '/storage/images/' + Wallpapper.image" class="img-fluid" alt="">
              <div class="portfolio-info">
                <h4>{{Wallpapper.title}}</h4>
                <h5>- Wallpapper</h5>
              </div>
            </div>
          </a>
          </div>

      
        </div>

      </div>
    </section><!-- End Portfolio Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Contact</h2>
        </div>

        <div class="row mt-1">

          <div class="col-lg-4">
            <div class="info">

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>{{email}}</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Call:</h4>
                <p>{{phone}}</p>
              </div>

            </div>

          </div>

          <div class="col-lg-8 mt-5 mt-lg-0">

            <form @submit.prevent="ContactUs" id="contact_us" class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required>
                </div>
              </div>
              <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message">Bad information submitted , Please Write Correct Information</div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center" id="submit"><button type="submit">Send Message</button></div>
            </form>

          </div>

        </div>

      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->
</template>


<script>
import VueJsCounter from 'vue-js-counter';
import { VueTypedJs } from 'vue-typed-js'

export default {
  props: ['about','facts','products','email','phone','wallpappers','cats', 'sumWallpappers', 'sumapk_users', 'sumposts', 'sumcourses', 'sumstore','socials'],
  components: {
    VueJsCounter,
    VueTypedJs
  },
  data() {
    return {
      count: false,
      apps: [],
      titleStyle: '',
      host: location.host,
    };
  },
  methods: {
    handleScroll(event) {
      if (window.scrollY >= $("#facts").offset().top - 100) {
        this.count = true;
      }
    },

    getAllApps: function () {

      var name = [];
      var x = 0;
      this.cats.forEach(element => {
        name[x] = element['title'];
        x++;
      });

      document.addEventListener('DOMContentLoaded', function () {

        new Typed('.typed', {
          strings: name,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 1000,
          startDelay: 1000,
          loop: true,
        });
      });
    },
    ChangePageColors: function () {
      var rand = Math.floor(Math.random() * this.cats.length);
      var style = document.querySelector(".nav-menu").style
      style.setProperty('--btn_background_color', this.cats[rand].background_color);
      style.setProperty('--btn_text_color', this.cats[rand].title_color);

      sessionStorage.setItem("background_color", this.cats[rand].background_color);
      sessionStorage.setItem("text_color", this.cats[rand].title_color);


      var section = document.querySelector("#hero").style
      section.setProperty('--home_background_img', "url('http://"+this.host+"/storage/apks/"+this.cats[rand].slider_image+"') top right no-repeat");

      var style_facts = document.querySelectorAll(".count-box")
      for (let i = 0; i < style_facts.length; i++) {
        this.ChangeFactsColors(style_facts[i],this.cats,rand);
      }


      var style_contact = document.querySelectorAll(".info")[0].getElementsByTagName('i')
      for (let i = 0; i < style_contact.length; i++) {
        this.ChangeFactsColors(style_contact[i],this.cats,rand);
      }

      var style_contact_button = document.querySelectorAll("button[type=submit]")[0].style
      style_contact_button.setProperty('--btn_background_color', this.cats[rand].background_color);
      style_contact_button.setProperty('--btn_text_color', this.cats[rand].title_color);



      // this.ChangeContactColors(this.cats,rand);


      this.titleStyle = {
        color: this.cats[rand].text_color,
      }
    },
    ChangeFactsColors: function (div, cats, rand) {
      var style = div.style;
      style.setProperty('--btn_background_color', cats[rand].background_color);
      style.setProperty('--btn_text_color', cats[rand].title_color);
    },
    
    ChangeContactColors: function (div,cats, rand) {
      var style = div.style;
      style.setProperty('--btn_background_color', cats[rand].background_color);
      style.setProperty('--btn_text_color', cats[rand].title_color);
    },


    ContactUs() {
      var formData = new FormData(document.getElementById("contact_us"));
      var load    = document.getElementsByClassName('loading');
      var sent    = document.getElementsByClassName('sent-message');
      var error_msg   = document.getElementsByClassName('error-message');
      var submit  = document.getElementById('submit');
      load[0].style.display = "block";
      submit.style.display  = "none";
      // let instance = this;
      axios.post('api/contactUs', formData)
          .then(function (response) {
              load[0].style.display   = "none";
              sent[0].style.display   = "block";
              error_msg[0].style.display  = "none";
              submit.style.display    = "block";

              setTimeout(
                function() {
                  sent[0].style.display  = "none";
                }, 5000);
          })
          .catch(function (error) {

            load[0].style.display   = "none";
            error_msg[0].style.display  = "block";
            submit.style.display    = "block";
            setTimeout(
                function() {
                  error_msg[0].style.display  = "none";
                }, 10000);
            // console.log(error);
          });
    }



  },
  created() {
    this.getAllApps();
    window.addEventListener('scroll', this.handleScroll);

  },

  mounted() {
    this.ChangePageColors();
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },


};
</script>


