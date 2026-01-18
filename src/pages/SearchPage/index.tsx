import { FlightSearchProvider } from "../../context/FlightSearchContext";
import { SearchHero, SearchForm, SearchResults } from "../../components";
import { PageWrapper } from "./styled";

const SearchPage = () => {
    return (
        <FlightSearchProvider>
            <PageWrapper>
                <SearchHero />
                <SearchForm />
                <SearchResults />
            </PageWrapper>
        </FlightSearchProvider>
    );
};

export default SearchPage;

