<template>
  <div class="home-wrapper">
    <Modal 
    v-if="isActive"
     @close="isActive = false" 
     @hide="hide"
     @fetch="fetchData"
      />
      <ModalEdit
       v-if="editActive"
     @close="editActive = false" 
     @hide="hide"
     :product="product"
     @fetch="fetchData"/>
      <ModalDelete
       v-if="deleteActive"
     @close="deleteActive = false" 
     @hide="hide"
     :product="product"
     @fetch="fetchData"
     >
     <template #actions>
         Напишите №( {{product.id}} )
        <input
        class="input" 
        type="text"
        v-model="confirmation"
        :placeholder="CONFIRMATION_TEXT" 
        >
         для подтверждения

        <button class=" my-btn btn btn-danger"
        :disabled="confirmation != CONFIRMATION_TEXT"
        @click.prevent="deleteProduct(product)">Удалить</button>
         </template>
         </ModalDelete>
    <h2>Тестовое задание CRUD</h2>
    <hr />
    <div class="container">
      <div class="buttons-wrapper d-flex">
        <button
          type="button"
          class="btn btn-success"
          @click="(isActive = !isActive), hide()"
        >
          Создать продукт
        </button>
      </div>
      <hr />
      <div class="products-list">
        <h3>Список продуктов</h3>
        <Loading
        v-if="!load"/>
        <div v-if="load" class="product-wrapper">
          <div
            class="product d-flex"
            v-for="product in products"
            :key="product.id"
          >
            <div class="wrapper">
              <p class="product-name">Название товара: {{ product.name_uz }}</p>
              <p class="product-cost">Цена: {{ product.cost }} у.е</p>
              <p class="product-address">Адрес: {{ product.address }}</p>
            </div>
            <div class="wrapper">
              <button 
              type="button" 
              class="btn btn-primary"
              @click="(editActive = !editActive), fetchEl(product)"
              >Изменить</button>
              <button 
              type="button" 
              class="btn btn-danger"
              @click="(deleteActive = !deleteActive), fetchEl(product)"

              >Удалить</button>
            </div>
          </div>
        </div>
      </div>
          <div class="pagination" v-if="this.totalPages > 1">
            <button
              v-for="pageNumber in this.totalPages"
              :key="pageNumber"
              @click="changePage(pageNumber), $router.push({name:'home.page', params:{page: page}})"
              :class="{
                btn__active: page === pageNumber,
              }"
            >
              {{ pageNumber }}
            </button>
          </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from "../components/Modal.vue";
import ModalEdit from "../components/ModalEdit.vue";
import ModalDelete from "../components/ModalDelete.vue";
import Loading from "../components/Loading.vue"
export default {
  data() {
    return {
      isActive: false,
      editActive: false,
      deleteActive: false,
      load: false,

      product: "",
      products: "",
      confirmation:"",

      perPage: 5,
      page: 1,
      totalPages: "",


        id: '',
      CONFIRMATION_TEXT:"удалить" ,
    };

    
  },
  components: {
    Modal,
    ModalEdit,
    ModalDelete,
    Loading

  },
  created(){
      if(this.$route.params.page){
          this.page = +this.$route.params.page
      }else{
          this.page = 1
      }
      console.log(this.$route.params.page);
  },
  
 
  async mounted(){
        await this.fetchData();
    },
   watch: {
        page() {
            this.fetchData()
        },
    },

  methods: {
      fetchEl(el){
          this.product = el
      },
      async deleteProduct(el){

          await axios.delete(`http://94.158.54.194:9092/api/product/${el.id}`),

          this.hide()
          this.fetchData()
          this.deleteActive = false
          this.confirmation = ""
      },
    hide() {
      if (this.isActive || this.editActive ) {
        document.getElementsByTagName("body")[0].classList.add("hide");
      } else {
        document.getElementsByTagName("body")[0].classList.remove("hide");
      }
    },
    changePage(pageNumber){
            this.load = false
            this.page = pageNumber
           
        },

    async fetchData() {
      const products = await axios.get(
        `http://94.158.54.194:9092/api/product`,
        {
          params: {
              page: this.page,
            perPage: this.perPage,
          },

        }
      );
        const type = []
      const products2 = await axios.get(
        `http://94.158.54.194:9092/api/product`, {params:{
             page: this.page,
            perPage: this.perPage,
            
            

        }});
        products2.data.forEach(element => {
            type.push(element.product_type_id)
            console.log(type);

            
        });
      console.log(products2);
      const lengthData = await axios.get(
          `http://94.158.54.194:9092/api/product`)

      this.totalPages = Math.ceil(lengthData.data.length / this.perPage);

      this.products = products.data
      this.load=true
    },
  },

};
</script>

<style lang="scss" scoped>
$main-color: rgb(179, 83, 6);
.home-wrapper {
  margin-top: 30px;
}
.input{
    text-align: center;
    margin: 10px 0;
    &::placeholder{
        text-align: center;
    }
}
.my-btn{
    margin: 30px 0;
}
.products-list {
    position: relative;
    min-height: 480px;
  .product-wrapper {
    .product {
      margin: 20px 0;
      padding-bottom: 10px;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid red;
      p {
        display: inline-block;
        margin: 10px;
      }
      .btn {
        margin: 0 0 0 20px;
      }
    }
  }
}
    .pagination{
        display: flex;
        margin-top: 10px;
        margin: 10px -10px;
        justify-content: flex-end;
        button{
            color: rgb(117, 117, 117);
            padding: 10px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 4px;
            border: 2px solid rgb(117, 117, 117);
        }
    }
    .btn__active{
        border: 2px solid $main-color !important;
        color: $main-color !important;
        font-weight: bold;
        box-shadow: 0 0 3px $main-color;
        transition: all 100ms linear;
        pointer-events: none;
    }
</style>
