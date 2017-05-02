import React from 'react';

const Legend = () => {
    return (
        <div className="legend">
            <h5>Number of Students</h5>
            <div>
                under 10,000:
                <img src="/images/gradhat_red.png" alt=""/>
            </div>
            <div>
                 10,001 - 20,000:
                <img src="/images/gradhat_green.png" alt=""/>
            </div>
            <div>
                20,001 - 30,000:
                <img src="/images/gradhat_blue.png" alt=""/>
            </div>
            <div>
                30,001 - 40,000:
                <img src="/images/gradhat_purple.png" alt=""/>
            </div>
            <div>
                more then 40,001:
                <img src="/images/gradhat_yellow.png" alt=""/>
            </div>
        </div>
    )
}

export default Legend;
