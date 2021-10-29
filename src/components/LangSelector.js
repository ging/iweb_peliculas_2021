import { LangContext } from "./App";

export default function LangSelector(props) {
  return <LangContext.Consumer>
    {(context) => {
      return <select onChange={context.handleLanguageChange}>
          <option key="es" value="es">{context.dictionary["es"]}</option>
          <option key="en" value="en">{context.dictionary["en"]}</option>
        </select>
      }
    }		
    </LangContext.Consumer>
}