import "./styles/Assessment.css"

const Assessment = ({response}) => {

      return (
            <div className="assessment-text">
                  <div dangerouslySetInnerHTML={{ __html: response }}></div>
            </div>
      );

};

export default Assessment;