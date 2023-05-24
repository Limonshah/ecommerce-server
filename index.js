const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const productsCollections = client.db("ecommerce").collection("products");
    const productsvariationCollections = client.db("ecommerce").collection("productsvariation");

    const categoriesCollections = client
      .db("ecommerce")
      .collection("categories");
    const ordersCollections = client.db("ecommerce").collection("orders");
    const sectiononeCollections = client
      .db("ecommerce")
      .collection("sectionone");
    const sectiontwoCollections = client
      .db("ecommerce")
      .collection("sectiontwo");
    const sectionthreeCollections = client
      .db("ecommerce")
      .collection("sectionthree");
    const paymentaccountsCollections = client
      .db("ecommerce")
      .collection("paymentaccount");
    const cashondeliveryCollections = client
      .db("ecommerce")
      .collection("cashondelivery");

    const contactCollections = client.db("ecommerce").collection("contact");

    const topbannerCollections = client.db("ecommerce").collection("topbanner");

    const banneroneCollections = client.db("ecommerce").collection("bannerone");

    const bannertwoCollections = client.db("ecommerce").collection("bannertwo");

    const footerAboutCollections = client
      .db("ecommerce")
      .collection("footerabout");

    const footerAddressCollections = client
      .db("ecommerce")
      .collection("footeraddress");

    const footerSocialMediaCollections = client
      .db("ecommerce")
      .collection("footersocialmedia");

    const footerCopyrightMediaCollections = client
      .db("ecommerce")
      .collection("footercopyright");

    app.post("/add-product", async (req, res) => {
      const productInfo = req.body;
      const result = await productsCollections.insertOne(productInfo);
      res.send(result);
    });

    app.get("/products", async (req, res) => {
      const query = {};
      const cursor = productsCollections.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });

    app.get("/product/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const product = await productsCollections.findOne(query);
        res.send(product);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.post("/add-variation", async (req, res) => {
      const variation = req.body;
      const result = await productsvariationCollections.insertOne(variation);
      res.send(result);
    });

    app.get("/products-variation", async (req, res) => {
      const query = {};
      const cursor = productsvariationCollections.find(query);
      const variation = await cursor.toArray();
      res.send(variation);
    });

    app.get("/product-variation/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const variation = await productsvariationCollections.findOne(query);
        res.send(variation);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/products-variation/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const variation = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updatedDoc = {
          $set: {
            variationValue: variation.variationValue[0],
          },
        };
    
        const result = await productsvariationCollections.updateOne(
          filter,
          updatedDoc,
          options
        );
    
        if (result.modifiedCount !== 1 && result.upsertedCount !== 1) {
          throw new Error("Failed to update product variation");
        }
    
        res.send({ message: "Product variation updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred while updating the product variation" });
      }
    });
    


    /**
     * Category
     * ***/
    app.post("/add-category", async (req, res) => {
      const newCategory = req.body;
      const result = await categoriesCollections.insertOne(newCategory);
      res.send(result);
    });

    app.get("/categories", async (req, res) => {
      const query = {};
      const cursor = categoriesCollections.find(query);
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.get("/category/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const category = await categoriesCollections.findOne(query);
        res.send(category);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/edit-category/:id", async (req, res) => {
      const id = req.params.id;
      const editCategory = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: editCategory.Category,
        },
      };

      const result = await categoriesCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /**
     * Homepage Setting
     * ***/
    app.put("/home-sectionone/:id", async (req, res) => {
      const id = req.params.id;
      const homeSection1 = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: homeSection1.Category,
        },
      };

      const result = await homeSectionOneCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/home-sectionone", async (req, res) => {
      const query = {};
      const cursor = homeSectionOneCollections.find(query);
      const homesectionone = await cursor.toArray();
      res.send(homesectionone);
    });

    app.get("/home-sectionone/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const homePage = await homeSectionOneCollections.findOne(query);
        res.send(homePage);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /* home feature 2 */
    app.put("/home-sectiontwo/:id", async (req, res) => {
      const id = req.params.id;
      const homeSection2 = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: homeSection2.Category,
        },
      };

      const result = await homeSectionTwoCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/home-sectiontwo", async (req, res) => {
      const query = {};
      const cursor = homeSectionTwoCollections.find(query);
      const homesectiontwo = await cursor.toArray();
      res.send(homesectiontwo);
    });

    app.get("/home-sectiontwo/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const homePage = await homeSectionTwoCollections.findOne(query);
        res.send(homePage);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /***
     * Section One
     * **/

    app.post("/section-one", async (req, res) => {
      const section = req.body;
      const result = await sectiononeCollections.insertOne(section);
      res.send(result);
    });

    app.get("/sections-one", async (req, res) => {
      const query = {};
      const cursor = sectiononeCollections.find(query);
      const sections = await cursor.toArray();
      res.send(sections);
    });

    app.get("/section-one/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const section = await sectiononeCollections.findOne(query);
        res.send(section);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/section-one-edit/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForCategory = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: setSectionForCategory.Category,
          setSection: setSectionForCategory.setSection,
        },
      };

      const result = await sectiononeCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/section-one-edit-recent-products/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForRecentProducts = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          setSection: setSectionForRecentProducts.setSection,
        },
      };

      const result = await sectiononeCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /***
     * Section Two
     * **/

    app.post("/section-two", async (req, res) => {
      const section = req.body;
      const result = await sectiontwoCollections.insertOne(section);
      res.send(result);
    });

    app.get("/sections-two", async (req, res) => {
      const query = {};
      const cursor = sectiontwoCollections.find(query);
      const sections = await cursor.toArray();
      res.send(sections);
    });

    app.get("/section-two/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const section = await sectiontwoCollections.findOne(query);
        res.send(section);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/section-two-edit/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForCategory = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: setSectionForCategory.Category,
          setSection: setSectionForCategory.setSection,
        },
      };

      const result = await sectiontwoCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/section-two-edit-recent-products/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForRecentProducts = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          setSection: setSectionForRecentProducts.setSection,
        },
      };

      const result = await sectiontwoCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /***
     * Section three
     * **/

    app.post("/section-three", async (req, res) => {
      const section = req.body;
      const result = await sectionthreeCollections.insertOne(section);
      res.send(result);
    });

    app.get("/sections-three", async (req, res) => {
      const query = {};
      const cursor = sectionthreeCollections.find(query);
      const sections = await cursor.toArray();
      res.send(sections);
    });

    app.get("/section-three/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const section = await sectionthreeCollections.findOne(query);
        res.send(section);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/section-three-edit/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForCategory = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          Category: setSectionForCategory.Category,
          setSection: setSectionForCategory.setSection,
        },
      };

      const result = await sectionthreeCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/section-three-edit-recent-products/:id", async (req, res) => {
      const id = req.params.id;
      const setSectionForRecentProducts = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          setSection: setSectionForRecentProducts.setSection,
        },
      };

      const result = await sectionthreeCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /**
     *Contact Us
     * ***/

    app.post("/contact", async (req, res) => {
      const contact = req.body;
      const result = await contactCollections.insertOne(contact);
      res.send(result);
    });

    app.get("/contact", async (req, res) => {
      const query = {};
      const cursor = contactCollections.find(query);
      const contact = await cursor.toArray();
      res.send(contact);
    });

    /**
     *Top Banner
     * ***/
    app.post("/top-banner", async (req, res) => {
      const topBanner = req.body;
      const result = await topbannerCollections.insertOne(topBanner);
      res.send(result);
    });

    app.get("/top-banner", async (req, res) => {
      const query = {};
      const cursor = topbannerCollections.find(query);
      const topBanner = await cursor.toArray();
      res.send(topBanner);
    });

    app.get("/top-banner/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const topBanner = await topbannerCollections.findOne(query);
        res.send(topBanner);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/top-banner-edit/:id", async (req, res) => {
      const id = req.params.id;
      const editTopBanner = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          bannerTitle: editTopBanner.bannerTitle,
          bannerText: editTopBanner.bannerText,
          bannerButtonText: editTopBanner.bannerButtonText,
          bannerButtonTextLink: editTopBanner.bannerButtonTextLink,
          bannerImage: editTopBanner.bannerImage,
          bannerBackgroundImage: editTopBanner.bannerBackgroundImage,
        },
      };

      const result = await topbannerCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /**
     * Banner One
     * ***/
    app.post("/banner-one", async (req, res) => {
      const banner = req.body;
      const result = await banneroneCollections.insertOne(banner);
      res.send(result);
    });

    app.get("/banner-one", async (req, res) => {
      const query = {};
      const cursor = banneroneCollections.find(query);
      const banner = await cursor.toArray();
      res.send(banner);
    });

    app.get("/banner-one/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const bannerone = await banneroneCollections.findOne(query);
        res.send(bannerone);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/banner-one-edit/:id", async (req, res) => {
      const id = req.params.id;
      const bannerOneEdit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          bannerImageOne: bannerOneEdit.bannerImageOne,
        },
      };

      const result = await banneroneCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    /**
     * Banner Two
     * ***/
    app.post("/banner-two", async (req, res) => {
      const banner = req.body;
      const result = await bannertwoCollections.insertOne(banner);
      res.send(result);
    });

    app.get("/banner-two", async (req, res) => {
      const query = {};
      const cursor = bannertwoCollections.find(query);
      const banner = await cursor.toArray();
      res.send(banner);
    });

    app.get("/banner-two/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const bannertwo = await bannertwoCollections.findOne(query);
        res.send(bannertwo);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/banner-two-edit/:id", async (req, res) => {
      const id = req.params.id;
      const bannerTwoEdit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          bannerImageTwo: bannerTwoEdit.bannerImageTwo,
        },
      };

      const result = await bannertwoCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /**
     * Payment Setting
     * ***/
    app.post("/add-payment-account", async (req, res) => {
      const paymentAccountInfo = req.body;
      const result = await paymentaccountsCollections.insertOne(
        paymentAccountInfo
      );
      res.send(result);
    });

    app.get("/payment-accounts", async (req, res) => {
      const query = {};
      const cursor = paymentaccountsCollections.find(query);
      const paymentAccounts = await cursor.toArray();
      res.send(paymentAccounts);
    });

    app.post("/cash-on-delivery", async (req, res) => {
      const cashOnDeliveryInfo = req.body;
      const result = await cashondeliveryCollections.insertOne(
        cashOnDeliveryInfo
      );
      res.send(result);
    });

    app.get("/cash-on-delivery", async (req, res) => {
      const query = {};
      const cursor = cashondeliveryCollections.find(query);
      const cashOnDeliveryInfo = await cursor.toArray();
      res.send(cashOnDeliveryInfo);
    });

    app.get("/cash-on-delivery/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const cashonDelivery = await cashondeliveryCollections.findOne(query);
        res.send(cashonDelivery);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/cash-on-delivery/:id", async (req, res) => {
      const id = req.params.id;
      const cashOnDeliveryInfo = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          cashOnDeliveryStatus: cashOnDeliveryInfo.cashOnDeliveryStatus,
        },
      };

      const result = await cashondeliveryCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/payment-account/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const paymentAccount = await paymentaccountsCollections.findOne(query);
        res.send(paymentAccount);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/payment-edit/:id", async (req, res) => {
      const id = req.params.id;
      const editPayment = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          paymentAccount: editPayment.paymentAccount,
          accountType: editPayment.accountType,
          guideLine: editPayment.guideLine,
        },
      };

      const result = await paymentaccountsCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /**
     * Footer Section
     * ***/

    /* about */

    app.post("/footer-about", async (req, res) => {
      const footerAboutDetails = req.body;
      const result = await footerAboutCollections.insertOne(footerAboutDetails);
      res.send(result);
    });

    app.get("/footer-about", async (req, res) => {
      const query = {};
      const cursor = footerAboutCollections.find(query);
      const footerAbout = await cursor.toArray();
      res.send(footerAbout);
    });

    app.put("/footer-about/:id", async (req, res) => {
      const id = req.params.id;
      const footerAboutEdit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          websiteName: footerAboutEdit.websiteName,
          aboutUs: footerAboutEdit.aboutUs,
        },
      };

      const result = await footerAboutCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/footer-about/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const footerAbout = await footerAboutCollections.findOne(query);
        res.send(footerAbout);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /* address */
    app.post("/footer-address", async (req, res) => {
      const footerAddress = req.body;
      const result = await footerAddressCollections.insertOne(footerAddress);
      res.send(result);
    });

    app.get("/footer-address", async (req, res) => {
      const query = {};
      const cursor = footerAddressCollections.find(query);
      const footerAddress = await cursor.toArray();
      res.send(footerAddress);
    });

    app.put("/footer-address/:id", async (req, res) => {
      const id = req.params.id;
      const footerAddress = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          footerPhone: footerAddress.footerPhone,
          footerEmail: footerAddress.footerEmail,
          footerAdress: footerAddress.footerAdress,
        },
      };

      const result = await footerAddressCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/footer-address/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const footerAddress = await footerAddressCollections.findOne(query);
        res.send(footerAddress);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /* social */
    app.post("/footer-social", async (req, res) => {
      const footerSocial = req.body;
      const result = await footerSocialMediaCollections.insertOne(footerSocial);
      res.send(result);
    });

    app.get("/footer-social", async (req, res) => {
      const query = {};
      const cursor = footerSocialMediaCollections.find(query);
      const footerSocial = await cursor.toArray();
      res.send(footerSocial);
    });
    app.put("/footer-social/:id", async (req, res) => {
      const id = req.params.id;
      const footerSocial = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          facebook: footerSocial.facebook,
          youtube: footerSocial.youtube,
          twitter: footerSocial.twitter,
        },
      };

      const result = await footerSocialMediaCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/footer-social/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const footerSocial = await footerSocialMediaCollections.findOne(query);
        res.send(footerSocial);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /*footer-copyright */
    app.post("/footer-copyright", async (req, res) => {
      const footerCopyright = req.body;
      const result = await footerCopyrightMediaCollections.insertOne(
        footerCopyright
      );
      res.send(result);
    });

    app.get("/footer-copyright", async (req, res) => {
      const query = {};
      const cursor = footerCopyrightMediaCollections.find(query);
      const footerCopyright = await cursor.toArray();
      res.send(footerCopyright);
    });

    app.put("/footer-copyright/:id", async (req, res) => {
      const id = req.params.id;
      const footerCopyright = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          copyright: footerCopyright.copyright,
        },
      };

      const result = await footerCopyrightMediaCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.get("/footer-copyright/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const footerCopyright = await footerCopyrightMediaCollections.findOne(
          query
        );
        res.send(footerCopyright);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    /**
     * Order Section
     * ***/

    app.post("/new-order", async (req, res) => {
      const orderDetails = req.body;
      const result = await ordersCollections.insertOne(orderDetails);
      res.send(result);
    });

    app.post("/new-order-cash-on-delivery", async (req, res) => {
      const orderDetails = req.body;
      const result = await ordersCollections.insertOne(orderDetails);
      res.send(result);
    });

    app.get("/orders", async (req, res) => {
      const query = {};
      const cursor = ordersCollections.find(query);
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.get("/order/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const order = await ordersCollections.findOne(query);
        res.send(order);
      } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
      }
    });

    app.put("/order-accept/:id", async (req, res) => {
      const id = req.params.id;
      const accepted = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          orderStatus: accepted.orderStatus,
        },
      };

      const result = await ordersCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/order-cancel/:id", async (req, res) => {
      const id = req.params.id;
      const cancelled = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          orderStatus: cancelled.orderStatus,
        },
      };

      const result = await ordersCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/order-edit/:id", async (req, res) => {
      const id = req.params.id;
      const orderEdit = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          customerName: orderEdit.customerName,
          customerAddress: orderEdit.customerAddress,
          customerUpozilaName: orderEdit.customerUpozilaName,
          customerDistrictName: orderEdit.customerDistrictName,
          customerPhoneNumber: orderEdit.customerPhoneNumber,
        },
      };

      const result = await ordersCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    app.put("/delivery-status/:id", async (req, res) => {
      const id = req.params.id;
      const deliveryStatusChange = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          deliveryStatus: deliveryStatusChange.deliveryStatus,
        },
      };

      const result = await ordersCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    app.put("/payment-status/:id", async (req, res) => {
      const id = req.params.id;
      const paymentStatusChange = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          paymentStatus: paymentStatusChange.paymentStatus,
        },
      };

      const result = await ordersCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("eCommerce Website is Live Now");
});
app.listen(port, () => {
  console.log(`eCommerce Website is Live Now${port}`);
});
