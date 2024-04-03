import React from 'react'

const UserManage = () => {
  return (
    <div>
        <table>
            <thead>
            <tr>
                <th>Order</th>
                <th>Address</th>
                <th>Total Contracts</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>0x2fFFCa2f69343480258B9149610bD1E2e4a2415a</td>
                <td>5</td>
                <td><button className="tbm-button">Block</button><button className="tbm-button">Remove</button></td>
                
            </tr>
            <tr>
                <td>2</td>
                <td>0x2fFFCa2f69343480258B9149610bD1E2e4a2415a</td>
                <td>3</td>
                <td><button className="tbm-button">Block</button><button className="tbm-button">Remove</button></td>

            </tr>
            <tr>
                <td>3</td>
                <td>0x2fFFCa2f69343480258B9149610bD1E2e4a2415a</td>
                <td>7</td>
                <td><button className="tbm-button">Block</button><button className="tbm-button">Remove</button></td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default UserManage
