import * as React from 'react';
import { IRawUserMessage, TMessage } from '../../utils/chat/interfaces';
import { IHistoryMessage, IOfflineMessage, IOperatorMessage } from '../../utils/chat/interfaces';
import { scrollTo } from '../../utils/scroll';
import { MessageWrapper } from '../message-wrapper/MessageWrapper';
import * as styles from './index.css';

export interface IMessagesProps {
    data: (IOfflineMessage | IHistoryMessage | TMessage)[];
    apiUrl: string;
}

export interface IMessagesState {
    data: (IOfflineMessage | IHistoryMessage | TMessage)[];
}

export class Messages extends React.Component<IMessagesProps, IMessagesState> {
    public chatList: React.RefObject<HTMLDivElement>;

    public constructor(props: IMessagesProps) {
        super(props);

        this.state = {
            data: this.props.data,
        };

        this.chatList = React.createRef();
        this.isOperatorImageShow = this.isOperatorImageShow.bind(this);
        this.onDownload = this.onDownload.bind(this);
    }

    public componentDidMount() {
        const chatList = this.chatList && this.chatList.current;

        if (chatList) {
            scrollTo(chatList, chatList.scrollHeight, 1000);
        }
    }

    public componentWillReceiveProps(nextProps: Readonly<IMessagesProps>) {
        if (this.state.data !== nextProps.data) {
            this.setState({ data: nextProps.data });
        }
    }

    public componentDidUpdate(prevProps: Readonly<IMessagesProps>, prevState: Readonly<IMessagesState>) {
        const isLengthPropsDataChange =
            prevProps.data && this.props.data && prevProps.data.length !== this.props.data.length;
        const isLengthStateDataChange =
            prevState.data && this.state.data && prevState.data.length !== this.state.data.length;
        const chatList = this.chatList && this.chatList.current;

        if ((isLengthPropsDataChange || isLengthStateDataChange) && chatList) {
            scrollTo(chatList, chatList.scrollHeight, 1250);
        }
    }

    public isOperatorImageShow(
        msg: IOfflineMessage | IHistoryMessage | TMessage,
        prevMsg?: IOfflineMessage | IHistoryMessage | TMessage,
    ): boolean {
        return msg.direction === 'to customer'
            ? prevMsg && prevMsg.direction === 'to customer'
                ? false
                : true
            : false;
    }

    public isNewDate(newDate: string, prevDate?: string) {
        if (!prevDate) {
            return true;
        }

        const nDate = new Date(newDate);
        const pDate = new Date(prevDate);

        return nDate.getDate() !== pDate.getDate();
    }

    public onDownload(token: string) {
        const protocol = window.location.protocol;
        window.location.assign(
            `${this.props.apiUrl}/api/v1/media/_get?fileToken=${token}`,
        );
    }

    public render() {
        return (
            <div className={styles.container} ref={this.chatList}>
                {this.state.data.map((msg, i) => {
                    const prevMsg = this.state.data[i - 1];
                    const prevMsgDate = prevMsg ? prevMsg.clientCreated : undefined;
                    const isNewDate = this.isNewDate(msg.clientCreated, prevMsgDate);
                    const isOperatorChanged = msg.direction === 'to customer' ? this.isOpertorChanged(i) : false;

                    return (
                        <MessageWrapper
                            key={msg.messageToken}
                            isOperatorChanged={isOperatorChanged}
                            data={msg}
                            apiUrl={this.props.apiUrl}
                            isNewDate={isNewDate}
                            showUserPick={this.isOperatorImageShow(msg, prevMsg)}
                            onDownload={this.onDownload}
                        />
                    );
                })}
            </div>
        );
    }

    private isOpertorChanged(index: number) {
        const prevOpeatorMsgs = this.getPrevOperatorMessage(index);

        if (prevOpeatorMsgs && prevOpeatorMsgs.length) {
            const lastMsg = prevOpeatorMsgs[prevOpeatorMsgs.length - 1];
            const lastOperator = (lastMsg as IOperatorMessage).newOperator || (lastMsg as IOperatorMessage).operator;
            const currentOperator = (this.state.data[index] as IOperatorMessage).newOperator ||
                (this.state.data[index] as IOperatorMessage).operator;

            return currentOperator && lastOperator && currentOperator.token !== lastOperator.token;
        }

        return true;
    }

    private getPrevOperatorMessage(index: number) {
        return this.state.data.filter((msg, i) => (
            i < index &&
            msg.direction === 'to customer' &&
            ((msg as IOperatorMessage).newOperator || (msg as IOperatorMessage).operator)
        ));
    }
}
