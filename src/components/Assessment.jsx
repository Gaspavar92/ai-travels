const Assessment = ({response}) => {

      return (
         <div dangerouslySetInnerHTML={{ __html: response }}></div>
      );

};

export default Assessment;