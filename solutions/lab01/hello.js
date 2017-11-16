import React,{Component} from 'react';
import Butter from 'buttercms'
import Transmit from 'react-transmit-client-server';

const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');

class Hello extends Component {


    render() {
        if (this.props.posts) {
            return (
                <div>
                    {this.props.posts.data.map((post) => {
                        return (
                            <div key={post.slug}>{post.title}</div>
                        )
                    })}
                </div>
            );
        } else {
            return <div>Loading...</div>;
        }
    }
}

export default Transmit.createContainer(Hello, {
    initialVariables: {},
    fragments: {
        posts() {
            return butter.post.list().then((resp)=>resp.data);
        }
    }
});