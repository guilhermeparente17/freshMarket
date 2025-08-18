import { Categories } from "../components/Categories";
import { Hero } from "../components/Hero";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Hero />
      <Categories selectedCategory={""} onCategorySelect={() => {}} />
    </div>
  );
};

export default LandingPage;
