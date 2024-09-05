
import CallToAction from "./Individual-Homepage-Components/CallToAction";
import CarmartAccordion from "./Individual-Homepage-Components/CarmartAccordion";
import HomepageStep from "./Individual-Homepage-Components/HomepageStep";
import SearchAndCars from "./Individual-Homepage-Components/SearchAndCars";

function HomepageContainer() {

  return (
    <div className="mt-10">
      <HomepageStep className="my-2" />
      <SearchAndCars />
      <CallToAction />
      <CarmartAccordion />
    </div>
  );
}

export default HomepageContainer;
