import React from 'react'
import './sidebar.css'
class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.unpackEvents();
    }
    unpackEvents() {
        let pcount = 0;
        let scount = 0;
        let fcount = 0;
        let total = 0;
    
        for (let i = 0; i < this.props.events.length; i++) {
            if (this.props.events[i].type === "procrastination") {
                pcount++;
            }
            else if (this.props.events[i].type === "sleep") {
                scount++;
            }
            else if (this.props.events[i].type === "feelings") {
                fcount++;
            }
        }
        total = pcount + scount + fcount;
    
        return (
            <table className='table table-sm table-borderless' id='statstable'>
                <tbody>
                    <tr>
                        <th>Procrastination</th>
                        <td>{pcount}</td>
                    </tr>
                    <tr>
                        <th>Sleep</th>
                        <td>{scount}</td>
                    </tr>
                    <tr>
                        <th>Feelings</th>
                        <td>{fcount}</td>
                    </tr>
                    <tr>
                        <th>Total Logs</th>
                        <td>{total}</td>
                    </tr>
                </tbody>
            </table>
        );
    }



    render() {
        return (
            <aside className='border py-4 px-2 w-64 justify-center items-center'>
                <h3 className='text-center text-lg'>Overall Logs:</h3>
               {this.unpackEvents()}
            </aside>
        )
    }
    
}

export default Sidebar
