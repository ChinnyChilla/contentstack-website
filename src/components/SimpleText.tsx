import { FunctionComponent } from "react";
import "./SimpleText.css";
import { create } from "domain";

export type SimpleTextType = {
  message: string;
  creator_display_name: string;
  creator_profile_url: string;
};

const SimpleText: FunctionComponent<SimpleTextType> = ({ message, creator_display_name, creator_profile_url}) => {

	const createMarkup = (html: any) => {
		return {__html: html};
	}
  return (
    <div className={`simple-text`}>
      <img className="simple-text-child" alt="" src="/rectangle-47-1.svg" />
      <div className="name-here15">{creator_display_name}</div>
      <div className="avatar-204">
        <img className="frame-icon16" alt="" src={creator_profile_url} />
      </div>
      <div className="simple-text-message-body-container">
		<span className="simple-text-message-body-text" dangerouslySetInnerHTML={createMarkup(message)} />
      </div>
    </div>
  );
};

export default SimpleText;