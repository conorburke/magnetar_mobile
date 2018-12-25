import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button, FormInput, FormLabel } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';

import * as actions from '../actions';
import { AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY } from '../../keys';
import { addToolPicture, createTool } from './mutations';
import url from '../utils';
import { userToolsQuery } from './queries';

class CreateToolScreen extends Component {
  state = {
    title: '',
    category: '',
    description: '',
    price: '',
    depotId: '',
    uri: null,
    uriString: '',
    pictureName: '',
    pictureFileType: 'png'
  };

  openCamera = () => {
    window.console.log(AMAZON_ACCESS_KEY);
    ImagePicker.showImagePicker({ title: 'Take Picture of Tool' }, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        const uri = { uri: 'data:image/jpeg;base64,' + res.data };
        const uriString = res.uri;
        const pictureName = res.fileName;
        const pictureFileType = pictureName.split('.')[1].toLowerCase();
        this.setState({ uri, uriString, pictureName, pictureFileType });
      }
    });
  };

  handleSubmit() {
    window.console.log('this.props.profile', this.props.profile);
    axios
      .post(`${url.api}/oracle`, {
        query: createTool,
        variables: {
          title: this.state.title,
          category: this.state.category,
          description: this.state.description,
          price: Number(this.state.price),
          depot_id: this.state.depotId
        }
      })
      .then(() => {
        let profileId = this.props.profile.id;
        axios
          .post(`${url.api}/oracle`, {
            query: userToolsQuery,
            variables: { id: profileId }
          })
          .then(res => {
            let depots = res.data.data.user.depots;
            let toolList = [];
            depots.forEach(depot => {
              depot.tools.forEach(t => {
                toolList.push(Number(t.id));
              });
            });
            const maxId = Math.max(...toolList);
            let file = {
              // `uri` can also be a file system path (i.e. file://)
              uri: this.state.uriString,
              name: `${Date.now()}_${this.state.pictureName}`,
              type: 'image/jpg'
            };
            let options = {
              acl: 'public-read-write',
              keyPrefix: 'uploads/',
              bucket: 'magnetar-tool-pictures',
              region: 'us-east-2',
              accessKey: AMAZON_ACCESS_KEY,
              secretKey: AMAZON_SECRET_KEY,
              successActionStatus: 201,
              awsUrl: 's3.us-east-2.amazonaws.com'
            };
            console.log('file', file);
            console.log('options', options);
            RNS3.put(file, options)
              .then(res => {
                console.log('s3 res', res);
                const imageS3URL = res.body.postResponse.location;
                axios
                  .post(`${url.api}/oracle`, {
                    query: addToolPicture,
                    variables: {
                      image: imageS3URL,
                      tool_id: maxId
                    }
                  })
                  .then(res => console.log(res))
                  .catch(err => console.log(err));
              })
              .catch(err => console.log('s3 error', err));
          })
          .catch(err => console.log(err));
        this.props.fetchTools();
        this.props.fetchProfile(this.props.profile.id);
      })
      .catch(err => {
        console.log(err);
      });
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FormLabel>Tool Title</FormLabel>
          <FormInput
            value={this.state.title}
            onChangeText={title => this.setState({ title })}
          />
        </View>
        <View>
          <FormLabel>Category</FormLabel>
          <FormInput
            value={this.state.category}
            onChangeText={category => this.setState({ category })}
          />
        </View>
        <View>
          <FormLabel>Description</FormLabel>
          <FormInput
            value={this.state.description}
            onChangeText={description => this.setState({ description })}
          />
        </View>
        <View>
          <FormLabel>Price / Hour</FormLabel>
          <FormInput
            value={this.state.price}
            onChangeText={price => this.setState({ price })}
          />
        </View>
        <View>
          <FormLabel>Depot ID</FormLabel>
          <FormInput
            value={this.state.depotId}
            onChangeText={depotId => this.setState({ depotId })}
          />
        </View>
        <View>
          <Image source={this.state.uri} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button
            title="Take Picture"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.openCamera}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Submit"
            backgroundColor="#e4000f"
            rounded={true}
            raised={true}
            fontSize={22}
            onPress={this.handleSubmit.bind(this)}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { profile: state.profile };
}

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  previewImage: {
    width: 200,
    height: 80
  }
});

export default connect(
  mapStateToProps,
  actions
)(CreateToolScreen);
