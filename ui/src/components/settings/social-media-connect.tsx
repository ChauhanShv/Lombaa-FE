import React, { useEffect } from 'react';
import { ListGroup, Form } from 'react-bootstrap';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GOOGLE_CLIENTID, FB_APPID } from '../../config';
import { useAppContext, ActionTypes } from '../../contexts';
import { useAxios } from '../../services';

export const SocialMediaConnect: React.FC = () => {
    const { state, dispatch } = useAppContext();
    const userData = state.user?.metaData;

    const [{ data: googleResponse, loading: googleLoading, error: googleError }, googleExecute] = useAxios({
        url: '/user/google',
        method: 'PUT',
    });
    const [{ data: facebookResponse, loading: facebookLoading, error: facebookError }, facebookExecute] = useAxios({
        url: '/user/facebook',
        method: 'PUT'
    });
    const [{ data: googleDeleteResponse, loading: googleDeleteLoading, error: googleDeleteError }, googleDeleteExecute] = useAxios({
        url: '/user/google',
        method: 'DELETE',
    });
    const [{ data: fbDeleteResponse, loading: fbDeleteLoading, error: fbDeleteError }, fbDeleteExecute] = useAxios({
        url: '/user/facebook',
        method: 'DELETE',
    });

    useEffect(() => {
        if (googleResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: googleResponse?.metadata?.user,
                }
            })
        }
        if (facebookResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: facebookResponse?.metadata?.user,
                }
            })
        }
        if (googleDeleteResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: googleDeleteResponse?.metadata?.user,
                }
            })
        }
        if (fbDeleteResponse?.success) {
            dispatch({
                type: ActionTypes.UPDATE_PROFILE,
                payload: {
                    metaData: fbDeleteResponse?.metadata?.user,
                }
            })
        }
    }, [googleResponse, facebookResponse, googleDeleteResponse, fbDeleteResponse]);

    const handleGoogleDisconnect = () => {
        const confirmDisconnect = confirm('Are you sure you want to disconnect from your google account');
        if (confirmDisconnect) {
            googleDeleteExecute({});
        }
        else return;
    };
    const handleFacebookDisconnect = () => {
        const confirmDisconnect = confirm('Are you sure you want to disconnect from your facebook account');
        if (confirmDisconnect) {
            fbDeleteExecute({});
        }
        else return;
    }

    const responseGoogle = (response: any) => {
        if (response.accessToken) {
            googleExecute({
                data: {
                    accessToken: response.accessToken
                }
            });
        }
    };
    const responseFacebook = (response: any) => {
        if (response.accessToken) {
            facebookExecute({
                data: {
                    accessToken: response.accessToken
                }
            });
        }
    }

    return (
        <>
            <p className="mb-3"><strong>Connect your social media accounts for smoother experience!</strong></p>
            <ListGroup as="ul" className="connectsocial mb-3">
                <ListGroup.Item as="li">
                    <span><FaGoogle />  Google</span>
                    <span>
                        {!userData?.isGoogleVerified ?
                            (
                                <GoogleLogin
                                    clientId={GOOGLE_CLIENTID}
                                    render={renderProps => (
                                        <Form.Check
                                            id='connect-google'
                                            type="switch"
                                            checked={userData?.isGoogleVerified}
                                            onChange={renderProps.onClick}
                                        />
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                    prompt="select_account"
                                />
                            ) : (
                                <Form.Check
                                    id='connect-google'
                                    type="switch"
                                    checked={userData?.isGoogleVerified}
                                    onChange={handleGoogleDisconnect}
                                />
                            )
                        }
                    </span>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <span><FaFacebook /> Facebook</span>
                    <span>
                        {!userData?.isFacebookVerified ?
                            (
                                <FacebookLogin
                                    appId={FB_APPID}
                                    autoLoad={false}
                                    fields='name,email,picture'
                                    render={renderProps => (
                                        <Form.Check
                                            id='connect-facebook'
                                            type="switch"
                                            checked={userData?.isFacebookVerified}
                                            onChange={renderProps.onClick}
                                        />
                                    )}
                                    callback={responseFacebook}
                                    onFailure={responseFacebook}
                                />
                            ) : (
                                <Form.Check
                                    id='connect-facebook'
                                    type="switch"
                                    checked={userData?.isFacebookVerified}
                                    onChange={handleFacebookDisconnect}
                                />
                            )
                        }
                    </span>
                </ListGroup.Item>
            </ListGroup>
        </>
    );
}