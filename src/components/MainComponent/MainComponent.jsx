import "../MainComponent/MainComponent.css";
import CardComponent from "../CardComponent/CardComponent";

const MainComponent = () => {
  return (
    <main className="container-fluid">
      <div className="row justify-content-center">
        <CardComponent />
      </div>
    </main>
  );
};

export default MainComponent;
