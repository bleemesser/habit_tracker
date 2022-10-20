import React from 'react'
import './sidebar.css'
import axios from 'axios'
//the sidebar is a component used in the student dashboard, displaying a sort of overview
class Sidebar extends React.Component { // simple sidebar to display the most basic stats, could/should be expanded to include more in-depth analysis
    constructor(props) {
        super(props);
        this.props=props;
        this.unpackEvents = this.unpackEvents.bind(this);
    }
    componentDidMount() {
        this.unpackEvents();
    }
    //tracking number of each form submitted by this student as well as the total
    unpackEvents() {
        let pcount = 0;
        let scount = 0;
        let fcount = 0;
        let total = 0;
        let lasteventdate = "";
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
            if (i === this.props.events.length - 1) {
                lasteventdate = this.props.events[i].event_date;
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
                        <th>Total</th>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <th>Last Submission</th>
                        <td>{lasteventdate}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    //allow the student to download a csv of their form history
    exportEvents() {
        axios({
            url: '/student/download',
            method: 'GET',
            responseType: 'blob', // important
            headers: {
                'token': sessionStorage.getItem('token')
            }
        }).then((response) => {
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'data.csv');
                document.body.appendChild(link);
                link.click(); 
            }
            else {
                alert("Error downloading data, you probably need to log in again");
            }
        })
        .catch((error) => {
            console.log(error);
        }
        );
    }


    render() {
        return (
            <aside className='border py-4 px-2 w-64 flex flex-col justify-top items-center'>
                <h3 className='text-center text-lg'>Logs:</h3>
               {this.unpackEvents()}
               <button className='btn btn-light' onClick={this.exportEvents}>Download Data</button>
            </aside>
        )
    }
    
}

export default Sidebar;
