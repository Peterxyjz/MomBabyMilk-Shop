import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/model/schemas/User.schema'
import Role from '~/model/schemas/Role.schema'
import RefreshToken from '~/model/schemas/RefreshToken.schema'
import Category from '~/model/schemas/Category.schema'
import Brand from '~/model/schemas/Brand.schema'
import Product from '~/model/schemas/Product.schema'
import InputBill from '~/model/schemas/InputBill.schema'
import InputBillDetail from '~/model/schemas/InputBillDetail.schema'
import WareHouse from '~/model/schemas/WareHouse.schema'
import FeedBack from '~/model/schemas/Feeback.schema'
import Order from '~/model/schemas/Order.schema'
import OrderDetail from '~/model/schemas/OrderDetail.schema'
import Revenue from '~/model/schemas/Revenue.schema'
import Voucher from '~/model/schemas/Voucher.schema'
import VoucherOrder from '~/model/schemas/VoucherOrders.schema'
import News from '~/model/schemas/News.schema'
import ReplyFeedBack from '~/model/schemas/ReplyFeeback.schema'
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mombabymilk.lrg7esv.mongodb.net/?retryWrites=true&w=majority&appName=MomBabyMilk`
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
class DatabaseService {
  private client: MongoClient
  private db: Db //tạo thành thuộc tình db
  constructor() {
    this.client = new MongoClient(uri)
    // nạp giá trị cho thuộc tình db thông qua constructor
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  //hàm getUser:
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    //vào db lấy ra collection users, và vì chuỗi truyền vào có thể là undefined nên mình phải rằng buộc nó là string 'thử xóa as string để thấy lỗi'
  }
  //hàm getRole:
  get roles(): Collection<Role> {
    return this.db.collection(process.env.DB_ROLES_COLLECTION as string)
  }
  //method này trả về 1 collection chứa các object RefreshToken
  //RefreshToken là class mà ta đã tạo trước đó
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string) // users là tên của collection
  }
  //category:
  get categories(): Collection<Category> {
    return this.db.collection(process.env.DB_CATEGORIES_COLLECTION as string)
  }
  //brand:
  get brands(): Collection<Brand> {
    return this.db.collection(process.env.DB_BRANDS_COLLECTION as string)
  }
  //products:
  get products(): Collection<Product> {
    return this.db.collection(process.env.DB_PRODUCTS_COLLECTION as string)
  }
  //inputBill:
  get inputBills(): Collection<InputBill> {
    return this.db.collection(process.env.DB_INPUTBILLS_COLLECTION as string)
  }
  //inputbillDetail:
  get inputBillDetails(): Collection<InputBillDetail> {
    return this.db.collection(process.env.DB_INPUTBILLDETAIL_COLLECTION as string)
  }
  //warehouse:
  get warehouse(): Collection<WareHouse> {
    return this.db.collection(process.env.DB_WAREHOUSE_COLLECTION as string)
  }

  //feedback:
  get feedbacks(): Collection<FeedBack> {
    return this.db.collection(process.env.DB_FEEDBACKS_COLLECTION as string)
  }
  get replyFeebacks(): Collection<ReplyFeedBack> {
    return this.db.collection(process.env.DB_REPLY_FEEDBACKS_COLLECTION as string)
  }
  //order:
  get orders(): Collection<Order> {
    return this.db.collection(process.env.DB_ORDERS_COLLECTION as string)
  }
  //orderDetail
  get orderDetails(): Collection<OrderDetail> {
    return this.db.collection(process.env.DB_ORDERDETAIL_COLLECTION as string)
  }
  //revenue:
  get revenue(): Collection<Revenue> {
    return this.db.collection(process.env.DB_REVENUE_COLLECTION as string)
  }
  get vouchers(): Collection<Voucher> {
    return this.db.collection(process.env.DB_VOUCHER_COLLECTION as string)
  }
  get voucherOrders(): Collection<VoucherOrder> {
    return this.db.collection(process.env.DB_VOUCHER_ORDER_COLLECTION as string)
  }
  get news(): Collection<News> {
    return this.db.collection(process.env.DB_NEWS_COLLECTION as string)
  }
}
//từ class tạo object và export nó ra ngoài
const databaseService = new DatabaseService()
export default databaseService
