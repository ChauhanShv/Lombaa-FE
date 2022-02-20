import React from 'react';
import './chat-widget.css';

export const ChatWidget: React.FC = (): React.ReactElement => {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"></link>
            <link href="chat-widget.css" rel="stylesheet"></link>
            <div className="row">
                <div className="chat-widget col-12">
                    {/* <!-- DIRECT CHAT SUCCESS --> */}
                    <div className="box box-success direct-chat direct-chat-success">
                        <div className="box-header with-border">
                            <h3 className="box-title">Direct Chat</h3>

                            <div className="box-tools pull-right">
                                <span data-toggle="tooltip" title="3 New Messages" className="badge bg-green">3</span>
                                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                                </button>
                                <button type="button" className="btn btn-box-tool" data-toggle="tooltip" title="Contacts"
                                    data-widget="chat-pane-toggle">
                                    <i className="fa fa-comments"></i></button>
                                <button type="button" className="btn btn-box-tool" data-widget="remove"><i
                                    className="fa fa-times"></i></button>
                            </div>
                        </div>
                        {/* <!-- /.box-header --> */}
                        <div className="box-body">
                            {/* <!-- Conversations are loaded here --> */}
                            <div className="direct-chat-messages">
                                {/* <!-- Message. Default to the left --> */}
                                <div className="direct-chat-msg">
                                    <div className="direct-chat-info clearfix">
                                        <span className="direct-chat-name pull-left">David Parker</span>
                                        <span className="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                                    </div>
                                    {/* <!-- /.direct-chat-info --> */}
                                    <img className="direct-chat-img" src="https://picsum.photos/40"
                                        alt="Message User Image" />
                                    {/* <!-- /.direct-chat-img --> */}
                                    <div className="direct-chat-text">
                                        Is this template really for free? That's unbelievable!
                                    </div>
                                    {/* <!-- /.direct-chat-text --> */}
                                </div>
                                {/* <!-- /.direct-chat-msg --> */}

                                {/* <!-- Message to the right --> */}
                                <div className="direct-chat-msg right">
                                    <div className="direct-chat-info clearfix">
                                        <span className="direct-chat-name pull-right">John Smith</span>
                                        <span className="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
                                    </div>
                                    {/* <!-- /.direct-chat-info --> */}
                                    <img className="direct-chat-img" src="https://picsum.photos/2/40"
                                        alt="Message User Image" />
                                    {/* <!-- /.direct-chat-img --> */}
                                    <div className="direct-chat-text">
                                        You better believe it!
                                    </div>
                                    {/* <!-- /.direct-chat-text --> */}
                                </div>
                                {/* <!-- /.direct-chat-msg --> */}
                            </div>
                            {/* <!--/.direct-chat-messages--> */}

                            {/* <!-- Contacts are loaded here --> */}
                            <div className="direct-chat-contacts">
                                <ul className="contacts-list">
                                    <li>
                                        <a href="#">
                                            <img className="contacts-list-img" src="https://bootdey.com/img/Content/user_1.jpg" />

                                            <div className="contacts-list-info">
                                                <span className="contacts-list-name">
                                                    Count Dracula
                                                    <small className="contacts-list-date pull-right">2/28/2015</small>
                                                </span>
                                                <span className="contacts-list-msg">How have you been? I was...</span>
                                            </div>
                                            {/* <!-- /.contacts-list-info --> */}
                                        </a>
                                    </li>
                                    {/* <!-- End Contact Item --> */}
                                </ul>
                                {/* <!-- /.contatcts-list --> */}
                            </div>
                            {/* /.direct-chat-pane --> */}
                        </div>
                        {/* <!-- /.box-body --> */}
                        <div className="box-footer">
                            <form action="#" method="post">
                                <div className="input-group">
                                    <input type="text" name="message" placeholder="Type Message ..." className="form-control" />
                                    <span className="input-group-btn">
                                        <button type="submit" className="btn btn-success btn-flat">Send</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                        {/* <!-- /.box-footer--> */}
                    </div>
                    {/* <!--/.direct-chat --> */}
                </div>
            </div>
        </>
    );
};