{
  /*import CardComponent from "../../components/CardComponent/CardComponent";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Nav/Navbar";
import "../3Dprinter/Printer.css";

const Printer = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid category-page vh-auto">
        <div className="row mb-3">
          <div className="col justify-content-center text-light">
            <img
              className="img-printer"
              src="https://cdn.artec3d.com/styles/734_webp/s3/content-hub-images/how-does-a-3d-printer-work-01.jpg.webp?VersionId=S2R4AbI0tOUllfHqmPisNlOQlAvVsM44&itok=r6l2fTMM"
              alt="image-3DPrinter"
            />
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint
              animi pariatur illum dicta et amet quod, fugiat id ipsum
              praesentium cum nobis ad quisquam quos nulla? Illo, temporibus
              nisi enim repudiandae perferendis sapiente? Impedit dicta,
              accusantium blanditiis, non eaque ipsum architecto fugit quas
              odit, voluptate iure error in amet cumque eum! Deserunt, placeat
              quasi iusto et fuga excepturi officiis quisquam, magnam vero
              temporibus ea, aut accusamus consequatur nemo dolorum ipsum velit
              nesciunt expedita natus. Assumenda quaerat aliquam ab fuga id
              dignissimos rerum asperiores, aliquid molestiae eum distinctio,
              illum quibusdam animi voluptatem earum nobis ipsum pariatur minima
              numquam. Consequuntur, recusandae a. Eos quibusdam enim labore
              delectus blanditiis. Animi officiis id nostrum culpa impedit illum
              voluptatem quisquam rerum odio deserunt magnam incidunt eaque
              consequuntur deleniti tenetur at corrupti excepturi repudiandae
              saepe aliquam eligendi atque, cum repellat! Minima earum porro
              consequatur repellendus nulla soluta alias non voluptates sunt,
              harum quia dolor quis a est nobis. Sit minima iusto corrupti
              repellat distinctio aut nobis? Ipsam magni ab corporis sunt,
              beatae placeat voluptatem quas deleniti quaerat tempora sequi
              earum reiciendis sint quasi? Quidem numquam dignissimos illum
              minus cum nobis, vitae officiis esse incidunt placeat ut velit ab
              eveniet fugit corrupti! Exercitationem laboriosam sapiente quis
              aliquam molestiae. Dolorem rem recusandae, ducimus est molestiae
              atque totam praesentium consectetur ab, aut neque iste facere sunt
              temporibus a in ullam quasi, magnam mollitia autem tempore porro
              tenetur magni. Soluta sit vitae sunt ex! Dolor est reiciendis aut
              quos, ipsum possimus optio perferendis, amet blanditiis
              praesentium nemo. Optio eveniet ipsum quae culpa fugiat neque
              commodi fuga ab, obcaecati, deleniti temporibus quibusdam atque
              dolor. Sint doloribus possimus dicta, nihil dignissimos ducimus
              doloremque repellendus nostrum cupiditate fugiat facilis ea sequi
              earum aliquid quam quia. Ab maiores culpa, est atque, delectus
              rerum, hic placeat dicta enim adipisci deleniti ipsum tenetur aut
              voluptates unde.
            </p>
          </div>
        </div>
        <div className="row mb-5 pt-b d-flex justify-content-between gap-1">
          <div className="col-6 Printer-Video">
            <p>VIDEO 1</p>
          </div>
          <div className="col-6 Printer-Video">
            <p>VIDEO 2</p>
          </div>
        </div>
        <div className="row justify-content-center">
          <CardComponent
            filteredProducts={products.category === "Accessories"}
            key={filteredProducts._id}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Printer;*/
}

import { useSelector } from "react-redux";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Nav/Navbar";
import CardComponent from "../../components/CardComponent/CardComponent";
import "../3Dprinter/Printer.css";
import { allProducts } from "../../ReducerComponent/getProductsReducer";

const Printer = () => {
  const products = useSelector(allProducts); // Ottieni tutti i prodotti

  // Filtro per prodotti nella categoria "Accessories"
  const filteredProducts = products?.filter(
    (product) => product.category === "Accessories"
  );

  return (
    <>
      <Navbar />
      <div className="container-fluid category-page vh-auto">
        <div className="row mb-3">
          <div className="col justify-content-center text-light">
            <img
              className="img-printer"
              src="https://cdn.artec3d.com/styles/734_webp/s3/content-hub-images/how-does-a-3d-printer-work-01.jpg.webp?VersionId=S2R4AbI0tOUllfHqmPisNlOQlAvVsM44&itok=r6l2fTMM"
              alt="image-3DPrinter"
            />
            <p>{}</p>
          </div>
        </div>
        <div className="row mb-5 pt-b d-flex justify-content-between gap-1">
          <div className="col-6 Printer-Video">
            <p>VIDEO 1</p>
          </div>
          <div className="col-6 Printer-Video">
            <p>VIDEO 2</p>
          </div>
        </div>
        <div className="row justify-content-center">
          {filteredProducts?.length > 0 ? (
            <CardComponent filteredProducts={filteredProducts} />
          ) : (
            <p>No products available in this category.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Printer;
