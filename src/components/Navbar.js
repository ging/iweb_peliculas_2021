import { LangContext } from "./App";
import LangSelector from "./LangSelector";

export default function Navbar(props) {
	
	return <LangContext.Consumer>
  	{(context) => {
			return <div className="header">
					<h1>{context.dictionary["favmovies"]}</h1>
					<LangSelector />
				</div>
			}
		}		
	</LangContext.Consumer>
}