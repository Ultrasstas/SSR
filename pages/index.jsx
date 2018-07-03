import React from 'react'
import cloudinary from 'cloudinary-core';
import PropTypes from 'prop-types';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: props.position || 'center center',
            width: '',
            height: '',
            cloudCore: new cloudinary.Cloudinary({cloud_name: 'demo'}),
            imageURL: undefined
        }
    }

    static async getInitialProps() {
        const cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'dkvgrlaiv'}),
              t = new cloudinary.Transformation();

        t.crop('fit')
         .width(1000)
         .height(1000);

        const imageUrl = cloudinaryCore.url('samples/imagecon-group.jpg', t);

        return {
            imageUrl: imageUrl,
            position: 'left top'
        }
    }

    componentDidMount() {
        const params = {
            width: window.innerWidth.toString() + 'px',
            height: window.innerHeight.toString() + 'px'
        },  
              cloudinaryCore = new cloudinary.Cloudinary({cloud_name: 'dkvgrlaiv'}),
              t = new cloudinary.Transformation();
        
        t.crop('')
         .width(Number(params.width.slice(0, params.width.length - 2)))
         .height(Number(params.height.slice(0, params.height.length - 2)));

        const imageUrl = cloudinaryCore.url('samples/imagecon-group.jpg', t);

        this.setState({width: params.width, height: params.height, imageURL: imageUrl});
    }

    render() {
        return(
            <div style={{display: 'flex',
                         flexFlow: 'column nowrap',
                         justifyContent: 'center',
                         alignItems: 'center',
                         width:'100%',
                         height: '100%'
                        }} >
                <div style={{backgroundImage: `url(${(this.state.imageURL === undefined) ? this.props.imageUrl: this.state.imageURL})`,
                     width: `${this.state.width}`,
                     height: `${this.state.height}`,
                     backgroundPosition: `${this.state.position}`,
                     alignSelf: 'center',
                     backgroundSize: 'cover'
                    }}
                 >
                </div>
            </div>
        )
    }
}

App.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    position: PropTypes.string
}

export default App;