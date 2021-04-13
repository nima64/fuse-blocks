import Select from 'react-select';

const customStyles = {
  control: (styles) => ({
    ...styles,
    cursor: 'pointer',
    minHeight: '30px',
    padding: '0 ',
    borderRadius: '2px',
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    minHeight: '30px',
    paddingTop: '0',
    paddingBottom: '0',
  }),
  input: (provided, state) => ({
    ...provided,
    margin: '0px',
    padding: '0px',
    "& input[type=text]:focus": {
      borderColor:'none',
      boxShadow: 'none',
    }
  }),
  dropdownIndicator: (provided,state) => ({
    ...provided,
    minHeight: '30px',
    margin : '0',
    padding: '0 6px',
    display:'flex',
    alignItems:'center',
    "& svg":{
      height: '15px',
    }
  }),
}

export default class GSelect extends Select {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div >
        <div style={{margin:'10px 0px'}}>{this.props.label}</div>
        <Select 
          {...this.props}
          value = {this.props.value}
          isMulti= {true}
          options = {this.props.options}
          styles={customStyles}
          theme = {theme => ({
            ...theme,
            borderRadius : 0,
            margin: '10px 0px',
            colors:{
              ...theme.colors,
              neutral20:'#757575',
              primary:'#007cba',
              dangerLight:'inherit',
              danger:'black',
              // --wp-admin-theme-color
              primary25:'#e6e6e6',
              neutral30:'rgb(117, 117, 117)',
            }
          })}
        />
      </div>

    )
  }
}