
<template>
    <div class="calendar">
        <div class="calendar-tools">
            <span class="calendar-prev" @click="prev">
                <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <path
                                d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z"
                                fill="#5e7a88"></path>
                        </g>
                    </g>
                </svg>
            </span>
            <span class="calendar-next" @click="next">
                <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">
                    <g class="transform-group">
                        <g transform="scale(0.015625, 0.015625)">
                            <path
                                d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z"
                                fill="#5e7a88"></path>
                        </g>
                    </g>
                </svg>
            </span>
            <div class="calendar-info" @click.stop="changeYear">
                <!-- {{monthString}} -->
                <div class="month">
                    <div class="month-inner" :style="{ 'top': -(this.month * 20) + 'px' }">
                        <span v-for="m in months" :key="m">{{ m }}</span>
                    </div>
                </div>
                <div class="year">{{ year }}</div>
            </div>
        </div>
        <table cellpadding="5">
            <thead>
                <tr>
                    <td v-for="week in weeks" class="week" :key="week">{{ week }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(day, k1) in days" style="{'animation-delay',(k1*30)+'ms'}" :key="day">
                    <td v-for="(child, k2) in day" :class="{ 'selected': child.selected, 'disabled': child.disabled }"
                        :key="child" @click="select(k1, k2, $event)">
                        <span
                            :style="{'background':`${child.eventName != undefined ?'#FF7F50':''}`,'color':`${child.eventName != undefined ?'white':'black'}`}"
                            :class="{ 'red': k2 == 0 || k2 == 6 || ((child.isLunarFestival || child.isGregorianFestival) && lunar) }">{{
                                child.day }}</span>
                        <div class="text" v-if="child.eventName != undefined">
                            <svg v-if="child.eventName .indexOf('1')!=-1" t="1687662301935" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2458" width="20" height="20">
                                <path
                                    d="M512 153.6c-123.477333 0-235.178667 51.9168-323.089067 137.557333C117.230933 360.96 68.266667 448.938667 68.266667 505.173333v13.6704c0 56.234667 48.981333 144.196267 120.644266 214.016C276.804267 818.466133 388.522667 870.4 512 870.4c123.613867 0 235.246933-51.234133 322.7648-135.970133 71.799467-69.5296 120.490667-157.320533 120.968533-215.296V505.173333c-0.477867-58.2656-49.169067-146.056533-120.968533-215.586133C747.246933 204.8512 635.5968 153.6 512 153.6z m0 68.266667c104.6528 0 199.799467 43.6736 275.268267 116.753066 59.886933 57.992533 99.8912 130.133333 100.1984 166.843734v13.380266c-0.3072 36.420267-40.311467 108.544-100.181334 166.536534C711.7824 758.459733 616.635733 802.133333 512 802.133333c-104.3456 0-199.560533-44.2368-275.456-118.186666C176.810667 625.7664 136.533333 553.4208 136.533333 518.843733V505.173333c0-34.577067 40.277333-106.922667 100.010667-165.12C312.439467 266.120533 407.6544 221.866667 512 221.866667z"
                                    fill="#444444" p-id="2459"></path>
                                <path
                                    d="M512 341.333333c-94.2592 0-170.666667 76.407467-170.666667 170.666667s76.407467 170.666667 170.666667 170.666667 170.666667-76.407467 170.666667-170.666667-76.407467-170.666667-170.666667-170.666667z m0 68.266667a102.4 102.4 0 1 1 0 204.8 102.4 102.4 0 0 1 0-204.8z"
                                    fill="#00B386" p-id="2460"></path>
                            </svg>
                            <svg v-if="child.eventName .indexOf('2')!=-1" t="1687662498421" class="icon" viewBox="0 0 1024 1024"
                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5991" width="20" height="20">
                                <path
                                    d="M770.3 657.2c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128z m73.1 162.1C842 847 818.9 869 790.7 869c-15.9 0-31-7.1-41.1-19.5L708 808.2c-4.7-5-4.7-12.8 0-17.8 5-5.3 13.3-5.6 18.6-0.7l15 14.9v-90.4c0-7 5.7-12.7 12.7-12.7 7 0 12.7 5.7 12.7 12.7v37.4c0.2-6.9 5.8-12.3 12.7-12.3 6.9 0 12.5 5.4 12.7 12.3v9c0-7 5.7-12.7 12.7-12.7 7 0 12.7 5.7 12.7 12.7v14.8c0-7 5.7-12.6 12.7-12.6 7 0 12.7 5.6 12.8 12.6v43.9z"
                                    fill="#FFAF35" p-id="5992"></path>
                                <path
                                    d="M623.1 786c0-80.6 65.4-146 146-146h1.2V148.2c0-27.5-22.5-50-50-50H180.2c-27.5 0-50 22.5-50 50v730.1c0 27.5 22.5 50 50 50h540.1c3.7 0 7.4-0.4 10.9-1.2C669 910.3 623.1 853.5 623.1 786zM322.2 352.1c0-17.7 14.5-32.2 32.2-32.2h319.7c17.7 0 32.2 14.5 32.2 32.2 0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2z m0 127.8c0-17.7 14.5-32.2 32.2-32.2h319.7c17.7 0 32.2 14.5 32.2 32.2 0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2zM199.7 343.7c4-4 10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1l-22.7-22.7c-3.8-3.9-3.8-10.4 0.1-14.4z m4 128c4-4 10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1l-22.7-22.7c-3.9-3.9-3.9-10.4 0.1-14.4z m95.6 109.7l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1L207 612.9c-4-4-4-10.5 0-14.5s10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5z m279 26.4c0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2 0-17.7 14.5-32.2 32.2-32.2H546c17.8-0.1 32.3 14.4 32.3 32.2z"
                                    fill="#FFAF35" p-id="5993"></path>
                            </svg>
                            <svg v-if="child.eventName .indexOf('3')!=-1" t="1687662548193" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                xmlns="http://www.w3.org/2000/svg" p-id="8290" width="20" height="20">
                                <path
                                    d="M508.416 510.72m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z"
                                    fill="#FFE1E9" p-id="8291"></path>
                                <path
                                    d="M674.8672 555.3664c-4.6592 5.2224-12.4928 6.0416-17.9712 1.6384-16.9472-13.7728-52.8896-35.5328-95.5904-18.1248-59.648 24.32-76.032 104.7552-34.4064 150.2208 28.928 31.5392 85.3504 89.2416 117.1456 121.6a33.51552 33.51552 0 0 0 47.1552 0.6656c33.3824-32.0512 91.7504-88.2176 107.6736-104.6016 22.7328-23.3472 47.872-83.4048 12.288-136.0384-35.3792-52.48-108.4416-46.4896-136.2944-15.36z"
                                    fill="#FF3369" p-id="8292"></path>
                                <path
                                    d="M483.1232 729.2928c-32.9728-35.9424-46.0288-87.04-34.8672-136.6528 11.1104-49.5104 45.0048-90.1632 90.6752-108.7488 40.6528-16.5888 84.4288-14.0288 124.16 6.4512 23.1424-12.6464 51.0464-19.0976 79.36-17.92 11.3664-46.08 8.8576-100.8128-25.4976-151.6544-63.232-93.5424-193.3312-82.8928-242.8928-27.392-8.2944 9.3184-22.272 10.752-31.9488 2.9184-30.1568-24.4736-94.1056-63.232-170.1888-32.256C165.7344 307.3024 136.4992 450.56 210.688 531.5072c51.456 56.1664 151.9616 158.8736 208.5888 216.4736 22.6816 23.04 59.4432 23.808 83.0976 1.9968-7.168-7.68-13.6704-14.6432-19.2512-20.6848z"
                                    fill="#FF4D7C" p-id="8293"></path>
                                <path
                                    d="M674.8672 555.3664c-4.6592 5.2224-12.4928 6.0416-17.9712 1.6384-16.9472-13.7728-52.8896-35.5328-95.5904-18.1248-59.648 24.32-76.032 104.7552-34.4064 150.2208 14.4384 15.7696 35.7888 38.0416 57.4464 60.4672 73.216-54.0672 129.4848-129.7408 159.3856-217.6512-27.392-2.2016-54.3232 7.168-68.864 23.4496z"
                                    fill="#FF4D7C" p-id="8294"></path>
                                <path
                                    d="M474.0608 293.3248c-8.2944 9.3184-22.272 10.752-31.9488 2.9184-30.1568-24.4736-94.1056-63.232-170.1888-32.256-106.1888 43.264-135.424 186.5216-61.2352 267.4688 29.4912 32.1536 74.9568 79.5136 119.1424 124.9792 42.0352-13.312 81.408-32.6144 117.0944-56.9344 0.4096-2.304 0.8192-4.5568 1.3312-6.8608 11.1104-49.5104 45.0048-90.1632 90.6752-108.7488 10.1376-4.1472 20.4288-7.0656 30.8224-8.8576a448.07168 448.07168 0 0 0 73.216-213.1456c-62.3616-23.7056-134.7584-6.7584-168.9088 31.4368z"
                                    fill="#FF5F89" p-id="8295"></path>
                                <path
                                    d="M466.8416 298.8544c-7.8848 3.9424-17.5104 3.2768-24.7808-2.6112-30.1568-24.4736-94.1056-63.232-170.1888-32.256-95.0784 38.7584-128.4096 157.6448-81.1008 240.1792 116.9408-29.4912 215.6032-104.6016 276.0704-205.312z"
                                    fill="#FF7196" p-id="8296"></path>
                            </svg>
                            <svg v-if="child.eventName .indexOf('4')!=-1" t="1687662586936" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9852" width="20" height="20"><path d="M359.5264 793.856h222.8736c3.8912 0 7.68 1.1264 10.9056 3.2768l127.8464 84.6848c29.6448 19.6608 69.2736-1.6384 69.2224-37.2224l-0.0512-30.9248c0-10.9056 8.8064-19.7632 19.7632-19.7632h31.1296c63.488 0 114.9952-51.5072 114.9952-114.9952V361.0624c0-63.488-51.5072-114.9952-114.9952-114.9952H359.5264c-63.488 0-114.9952 51.5072-114.9952 114.9952v317.7984c-0.0512 63.5392 51.456 114.9952 114.9952 114.9952z" fill="#5EEFB7" p-id="9853"></path><path d="M734.208 757.8624H485.2736c-4.352 0-8.5504 1.28-12.1856 3.6864l-167.6288 111.0528c-22.4768 14.8992-52.48-1.28-52.48-28.2112l0.1024-64.4096c0-12.1856-9.8304-22.0672-22.0672-22.0672h-34.7648c-70.912 0-128.4608-57.4976-128.4608-128.4608V274.5344c0-70.912 57.4976-128.4608 128.4608-128.4608H734.208c70.912 0 128.4608 57.4976 128.4608 128.4608v354.9184c-0.0512 70.912-57.5488 128.4096-128.4608 128.4096z" fill="#4BE2AC" p-id="9854"></path><path d="M359.5264 246.0672c-63.488 0-114.9952 51.5072-114.9952 114.9952v317.7984c0 63.488 51.5072 114.9952 114.9952 114.9952h64.768l48.8448-32.3584c3.584-2.4064 7.8336-3.6864 12.1856-3.6864h248.9344c70.912 0 128.4608-57.4976 128.4608-128.4608v-354.816c0-9.216-0.9728-18.2272-2.8672-26.9312-6.0928-0.9728-12.288-1.536-18.6368-1.536H359.5264z" fill="#06CC76" p-id="9855"></path><path d="M670.0544 361.6256H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h390.4c22.6304 0 40.96 18.3296 40.96 40.96s-18.2784 40.96-40.9088 40.96zM670.0544 500.992H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h390.4c22.6304 0 40.96 18.3296 40.96 40.96s-18.2784 40.96-40.9088 40.96zM466.5856 640.3584H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h186.9824c22.6304 0 40.96 18.3296 40.96 40.96s-18.3296 40.96-40.96 40.96z" fill="#FFFFFF" p-id="9856"></path></svg>
                            <svg v-if="child.eventName .indexOf('5')!=-1" t="1687662662409" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13505" width="20" height="20"><path d="M823.786667 693.333333l37.418666-467.626666-383.637333 18.261333L440.106667 693.333333h383.68z m-397.034667 31.936a21.333333 21.333333 0 0 1-19.498667-23.04l39.189334-470.250666a21.333333 21.333333 0 0 1 20.266666-19.541334l405.077334-19.285333a21.333333 21.333333 0 0 1 22.272 23.018667L854.912 705.706667a21.333333 21.333333 0 0 1-21.269333 19.626666h-405.12a21.333333 21.333333 0 0 1-1.770667-0.064z" fill="#F85600" p-id="13506"></path><path d="M881.664 441.941333l-26.325333 251.477334a21.333333 21.333333 0 0 1-21.162667 19.114666l-408.192 1.024 23.488-307.242666 411.605333 12.074666a21.333333 21.333333 0 0 1 20.586667 23.552z" fill="#FFB468" p-id="13507"></path><path d="M425.984 713.557333l-217.386667-120.981333a42.666667 42.666667 0 0 1-21.461333-31.146667L152.661333 324.096a21.333333 21.333333 0 0 1 28.906667-22.933333l267.904 105.152-23.488 307.242666z" fill="#FF7325" p-id="13508"></path><path d="M172.757333 297.557333L597.333333 277.333333l-21.333333 320H229.013333a42.666667 42.666667 0 0 1-42.24-36.629333l-34.133333-238.826667a21.333333 21.333333 0 0 1 20.117333-24.32z" fill="#FF962A" p-id="13509"></path><path d="M882.581333 433.770667l-26.24 261.76a21.333333 21.333333 0 0 1-30.186666 17.258666L576 597.333333l21.333333-320 273.493334 135.189334a21.333333 21.333333 0 0 1 11.754666 21.248z" fill="#FF7325" p-id="13510"></path><path d="M586.368 466.304l279.381333 135.082667-2.261333 22.549333-280.234667-135.509333 1.173334-17.493334 1.941333-4.629333z m5.290667-104.106667l284.309333 137.450667-2.261333 22.570667-283.562667-137.130667 1.514667-22.890667z" fill="#EC5702" p-id="13511"></path><path d="M219.52 597.333333h348.330667a42.666667 42.666667 0 0 1 15.722666 3.008l263.061334 104.405334a10.666667 10.666667 0 0 1-3.925334 20.586666H431.978667a42.666667 42.666667 0 0 1-19.733334-4.821333l-197.674666-103.04A10.666667 10.666667 0 0 1 219.52 597.333333z" fill="#FC280E" p-id="13512"></path><path d="M597.76 278.016c2.666667 0.618667 6.592 2.069333 11.754667 4.416l-19.328 288.192c-0.832 12.202667-0.405333 20.416 1.28 24.64 1.173333 3.008 6.336 7.786667 15.424 14.336l239.744 95.146667a10.666667 10.666667 0 0 1-3.925334 20.586666H431.978667a42.666667 42.666667 0 0 1-19.733334-4.821333l-197.674666-103.04A10.666667 10.666667 0 0 1 219.52 597.333333h318.122667c14.122667-2.282667 22.357333-5.461333 24.682666-9.557333 3.328-5.866667 5.205333-12.074667 5.632-18.666667l19.136-291.797333c4.458667-0.128 8.021333 0.106667 10.666667 0.704zM567.850667 618.666667H263.04l159.082667 82.922666a21.333333 21.333333 0 0 0 9.856 2.410667h354.944l-211.2-83.84a21.333333 21.333333 0 0 0-7.893334-1.493333z" fill="#FFB468" p-id="13513"></path><path d="M671.765333 652.650667l21.12 2.965333-12.373333 88.469333a10.666667 10.666667 0 0 1-10.581333 9.173334H324.373333a10.666667 10.666667 0 0 1-10.517333-12.437334l12.373333-72.490666 21.034667 3.584-10.24 60.032h323.626667l11.093333-79.296zM818.325333 714.794667l21.205334 2.304-9.472 87.04-21.205334-2.304z" fill="#FFB468" p-id="13514"></path><path d="M396.437333 707.306667l21.290667 1.28-4.608 77.354666-21.290667-1.28z" fill="#FFB468" p-id="13515"></path><path d="M242.837333 725.504l-2.24 0.426667C225.173333 729.706667 213.333333 751.872 213.333333 778.666667c0 29.44 14.336 53.333333 32 53.333333l1.322667-0.042667v0.106667L224 832C206.336 832 192 808.106667 192 778.666667s14.336-53.333333 32-53.333334l18.837333 0.170667zM562.837333 725.504l-2.24 0.426667C545.173333 729.706667 533.333333 751.872 533.333333 778.666667c0 29.44 14.336 53.333333 32 53.333333l1.322667-0.042667v0.106667L544 832c-17.664 0-32-23.893333-32-53.333333s14.336-53.333333 32-53.333334l18.837333 0.170667z" fill="#FF5C00" p-id="13516"></path><path d="M213.333333 778.666667a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z" fill="#ED0808" p-id="13517"></path><path d="M533.333333 778.666667a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z" fill="#ED0808" p-id="13518"></path><path d="M456.170667 832.170667l-2.24 0.426666C438.506667 836.373333 426.666667 858.538667 426.666667 885.333333c0 29.44 14.336 53.333333 32 53.333334l1.322666-0.042667v0.106667L437.333333 938.666667c-17.664 0-32-23.893333-32-53.333334s14.336-53.333333 32-53.333333l18.837334 0.170667z" fill="#FF5C00" p-id="13519"></path><path d="M426.666667 885.333333a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z" fill="#ED0808" p-id="13520"></path><path d="M818.837333 832.170667l-2.24 0.426666C801.173333 836.373333 789.333333 858.538667 789.333333 885.333333c0 29.44 14.336 53.333333 32 53.333334l1.322667-0.042667v0.106667L800 938.666667c-17.664 0-32-23.893333-32-53.333334s14.336-53.333333 32-53.333333l18.837333 0.170667z" fill="#FF5C00" p-id="13521"></path><path d="M789.333333 885.333333a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z" fill="#ED0808" p-id="13522"></path><path d="M855.04 174.528l28.842667-1.493333a21.333333 21.333333 0 0 1 22.4 22.677333l-2.261334 34.922667a21.333333 21.333333 0 0 1-15.786666 19.242666 22.613333 22.613333 0 0 0-11.754667-0.213333c-3.626667 0.981333-8.704 3.434667-15.168 7.381333h-0.106667a21.333333 21.333333 0 0 1-26.816-20.821333l0.426667-40.618667a21.333333 21.333333 0 0 1 20.245333-21.077333zM482.901333 194.602667l-27.093333 0.810666a21.333333 21.333333 0 0 0-20.693333 21.333334l0.042666 28.778666c0 7.338667 4.629333 13.866667 11.541334 16.341334a22.613333 22.613333 0 0 1 11.733333-0.213334c3.626667 0.981333 8.704 3.413333 15.168 7.36l2.197333 0.597334a21.333333 21.333333 0 0 0 26.773334-19.178667l2.261333-33.066667a21.333333 21.333333 0 0 0-21.930667-22.762666z" fill="#FFB333" p-id="13523"></path><path d="M567.168 682.666667a42.666667 42.666667 0 0 1 16.938667 3.498666l240.554666 104.042667 0.512 0.256c5.461333 1.066667 8.746667 2.837333 9.898667 5.333333v16.490667c13.418667 6.613333 20.373333 13.653333 20.885333 21.077333 0.746667 11.136-6.037333 52.373333-13.738666 65.194667-7.701333 12.8-21.248 10.112-25.728-8.426667-4.48-18.56-2.816-49.024-8.042667-52.586666-5.226667-3.584-14.592-5.888-21.674667 1.258666-10.026667 10.090667-16.810667 32.64-15.786666 51.434667-6.869333-9.749333-0.042667-54.016 2.197333-62.954667 1.493333-5.973333 7.466667-10.816 17.92-14.549333l0.042667-2.090667H472.405333v1.642667c12.202667 6.037333 19.050667 12.373333 20.586667 19.072l0.298667 2.005333c0.746667 11.136-6.037333 52.373333-13.738667 65.194667-7.701333 12.8-21.248 10.112-25.728-8.426667-4.48-18.56-2.816-49.024-8.042667-52.586666-5.226667-3.584-14.592-5.888-21.674666 1.258666-10.026667 10.090667-16.810667 32.64-15.786667 51.434667-6.869333-9.749333-0.042667-54.016 2.197333-62.954667 1.493333-5.973333 7.466667-10.816 17.92-14.549333l0.085334-2.858667a42.666667 42.666667 0 0 1-10.88-3.712l-138.133334-69.12c-1.664 16.704-7.189333 44.693333-13.290666 54.826667-7.701333 12.842667-21.248 10.133333-25.728-8.405333-4.48-18.56-2.816-49.024-8.042667-52.586667-5.226667-3.584-14.592-5.888-21.674667 1.258667-10.026667 10.090667-16.810667 32.64-15.786666 51.434666-6.869333-9.749333-0.042667-54.016 2.197333-62.954666 1.493333-5.973333 7.466667-10.816 17.92-14.549334l0.021333-1.173333-4.053333-2.026667a10.666667 10.666667 0 0 1 4.778667-20.202666h351.317333z m-32.021333 21.312L261.034667 704l166.165333 83.072a21.333333 21.333333 0 0 0 9.536 2.261333h125.696a36.394667 36.394667 0 0 1-1.92-5.866666c-4.48-18.56-2.837333-49.024-8.064-52.586667-5.226667-3.584-14.592-5.888-21.674667 1.258667-10.026667 10.090667-16.810667 32.64-15.786666 51.434666-6.869333-9.749333-0.042667-54.016 2.197333-62.954666 1.493333-5.973333 7.466667-10.816 17.92-14.549334l0.042667-2.090666z m54.293333 7.744c6.656 4.8 10.154667 9.792 10.517333 14.976 0.746667 11.136-6.037333 52.373333-13.738666 65.194666l1.322666-2.581333 181.333334 0.021333z" fill="#FF962A" p-id="13524"></path><path d="M298.453333 452.736v42.666667c0 4.693333-3.818667 8.661333-8.533333 8.832l-16.554667 0.554666a8.192 8.192 0 0 1-8.533333-8.234666v-42.666667l-16.661333 0.576a8.192 8.192 0 0 1-8.533334-8.234667v-17.066666c0-4.693333 3.818667-8.661333 8.533334-8.832l66.965333-2.304c4.693333-0.170667 8.533333 3.52 8.533333 8.234666v17.066667c0 4.714667-3.84 8.661333-8.533333 8.832l-16.682667 0.576z m83.157334-31.552l36.16 66.069333a8.746667 8.746667 0 0 1-3.477334 11.669334 8.746667 8.746667 0 0 1-4.053333 1.152l-72.32 2.496a8.192 8.192 0 0 1-8.533333-8.234667 8.746667 8.746667 0 0 1 1.024-4.074667l36.16-68.544a8.746667 8.746667 0 0 1 11.562666-3.882666 8.106667 8.106667 0 0 1 3.477334 3.349333z m93.333333 76.650667c-23.210667 0.810667-42.026667-17.642667-42.026667-41.216 0-23.552 18.816-43.306667 42.026667-44.117334 23.210667-0.789333 42.026667 17.664 42.026667 41.216 0 23.573333-18.816 43.306667-42.026667 44.117334z" fill="#FC280E" p-id="13525"></path><path d="M293.504 437.44v42.666667c0 4.693333-3.84 8.661333-8.533333 8.832l-16.554667 0.554666a8.192 8.192 0 0 1-8.533333-8.234666v-42.666667l-16.682667 0.576a8.192 8.192 0 0 1-8.533333-8.234667v-17.066666c0-4.693333 3.84-8.661333 8.533333-8.832l66.986667-2.304c4.693333-0.170667 8.533333 3.52 8.533333 8.234666v17.066667c0 4.693333-3.84 8.661333-8.533333 8.832l-16.682667 0.576z m83.136-31.552l36.16 66.048a8.746667 8.746667 0 0 1-3.477333 11.690667 8.746667 8.746667 0 0 1-4.053334 1.152l-72.298666 2.496a8.192 8.192 0 0 1-8.533334-8.234667 8.746667 8.746667 0 0 1 1.024-4.074667l36.16-68.544a8.746667 8.746667 0 0 1 11.541334-3.882666 8.106667 8.106667 0 0 1 3.477333 3.349333z m93.333333 76.650667c-23.210667 0.810667-42.026667-17.642667-42.026666-41.216 0-23.552 18.816-43.306667 42.026666-44.117334 23.210667-0.789333 42.026667 17.664 42.026667 41.216 0 23.573333-18.816 43.306667-42.026667 44.117334z" fill="#FFECDB" p-id="13526"></path></svg>
                        </div>
                        <div class="text"
                            :class="{ 'isLunarFestival': child.isLunarFestival, 'isGregorianFestival': child.isGregorianFestival }"
                            v-if="lunar">{{ child.lunar }}</div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="calendar-years" :class="{ 'show': yearsShow }">
            <span v-for="y in years" @click.stop="selectYear(y)" :class="{ 'active': y == year }" :key="y">{{ y }}</span>
        </div>

    </div>
</template>

<script>
import calendar from './calendar.js'
export default {
    props: {
        // 多选模式
        multi: {
            type: Boolean,
            default: false
        },
        // 范围模式
        range: {
            type: Boolean,
            default: false
        },
        // 默认日期
        value: {
            type: Array,
            default: function () {
                return []
            }
        },
        // 开始选择日期
        begin: {
            type: Array,
            default: function () {
                return []
            }
        },
        // 结束选择日期
        end: {
            type: Array,
            default: function () {
                return []
            }
        },

        // 是否小于10补零
        zero: {
            type: Boolean,
            default: false
        },
        // 屏蔽的日期
        disabled: {
            type: Array,
            default: function () {
                return []
            }
        },
        // 是否显示农历
        lunar: {
            type: Boolean,
            default: false
        },

        // 自定义星期名称
        weeks: {
            type: Array,
            default: function () {
                return ['日', '一', '二', '三', '四', '五', '六']
            }
        },
        // 自定义月份
        months: {
            type: Array,
            default: function () {
                return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            }
        },
        // 自定义事件
        events: {
            type: Object,
            default: function () {
                return {}
            }
        },
    },
    data() {
        return {
            years: [],
            yearsShow: false,
            year: 0,
            month: 0,
            day: 0,
            days: [],
            multiDays: [],
            today: [],
            festival: {
                lunar: {
                    "1-1": "春节",
                    "1-15": "元宵节",
                    "2-2": "龙头节",
                    "5-5": "端午节",
                    "7-7": "七夕节",
                    "7-15": "中元节",
                    "8-15": "中秋节",
                    "9-9": "重阳节",
                    "10-1": "寒衣节",
                    "10-15": "下元节",
                    "12-8": "腊八节",
                    "12-23": "祭灶节",
                },
                gregorian: {
                    "1-1": "元旦",
                    "2-14": "情人节",
                    "3-8": "妇女节",
                    "3-12": "植树节",
                    "4-5": "清明节",
                    "5-1": "劳动节",
                    "5-4": "青年节",
                    "6-1": "儿童节",
                    "7-1": "建党节",
                    "8-1": "建军节",
                    "9-10": "教师节",
                    "10-1": "国庆节",
                    "12-24": "平安夜",
                    "12-25": "圣诞节",
                },
            },
            rangeBegin: [],
            rangeEnd: [],
        }
    },
    watch: {
        events() {
            this.render(this.year, this.month)
        },
        value() {
            this.init();
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            let now = new Date();
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            if (this.value.length > 0) {
                if (this.range) { //范围
                    this.year = parseInt(this.value[0][0])
                    this.month = parseInt(this.value[0][1]) - 1
                    this.day = parseInt(this.value[0][2])

                    let year2 = parseInt(this.value[1][0])
                    let month2 = parseInt(this.value[1][1]) - 1
                    let day2 = parseInt(this.value[1][2])

                    this.rangeBegin = [this.year, this.month, this.day]
                    this.rangeEnd = [year2, month2, day2]
                } else if (this.multi) {//多选
                    this.multiDays = this.value;
                    this.year = parseInt(this.value[0][0])
                    this.month = parseInt(this.value[0][1]) - 1
                    this.day = parseInt(this.value[0][2])
                } else { //单选
                    this.year = parseInt(this.value[0])
                    this.month = parseInt(this.value[1]) - 1
                    this.day = parseInt(this.value[2])
                }
            }
            this.render(this.year, this.month)
        },
        // 渲染日期
        render(y, m) {
            let firstDayOfMonth = new Date(y, m, 1).getDay()         //当月第一天
            let lastDateOfMonth = new Date(y, m + 1, 0).getDate()    //当月最后一天
            let lastDayOfLastMonth = new Date(y, m, 0).getDate()     //最后一月的最后一天
            this.year = y
            let seletSplit = this.value
            let i, line = 0, temp = [], nextMonthPushDays = 1
            for (i = 1; i <= lastDateOfMonth; i++) {
                let day = new Date(y, m, i).getDay() //返回星期几（0～6）
                let k
                // 第一行
                if (day == 0) {
                    temp[line] = []
                } else if (i == 1) {
                    temp[line] = []
                    k = lastDayOfLastMonth - firstDayOfMonth + 1
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        
                        temp[line].push(Object.assign(
                            { day: k, disabled: true },
                            this.getLunarInfo(this.computedPrevYear(), this.computedPrevMonth(true), k),
                            this.getEvents(this.computedPrevYear(), this.computedPrevMonth(true), k),
                        ))
                        k++;
                    }
                }


                if (this.range) { // 范围
                    
                    let options = Object.assign(
                        { day: i },
                        this.getLunarInfo(this.year, this.month + 1, i),
                        this.getEvents(this.year, this.month + 1, i),
                    )
                    if (this.rangeBegin.length > 0) {
                        let beginTime = Number(new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2]))
                        let endTime = Number(new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]))
                        let stepTime = Number(new Date(this.year, this.month, i))
                        if (beginTime <= stepTime && endTime >= stepTime) {
                            options.selected = true
                        }
                    }
                    if (this.begin.length > 0) {
                        let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
                        if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    if (this.end.length > 0) {
                        let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
                        if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
                    }
                    if (this.disabled.length > 0) {
                        if (this.disabled.filter(v => { return this.year === v[0] && this.month === v[1] - 1 && i === v[2] }).length > 0) {
                            options.disabled = true
                        }
                    }
                    temp[line].push(options)
                } else if (this.multi) {//多选
                    let options
                    // 判断是否选中
                    if (this.value.filter(v => { return this.year === v[0] && this.month === v[1] - 1 && i === v[2] }).length > 0) {
                        options = Object.assign({ day: i, selected: true }, this.getLunarInfo(this.year, this.month + 1, i), this.getEvents(this.year, this.month + 1, i))
                    } else {
                        options = Object.assign({ day: i, selected: false }, this.getLunarInfo(this.year, this.month + 1, i), this.getEvents(this.year, this.month + 1, i))
                        if (this.begin.length > 0) {
                            let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.end.length > 0) {
                            let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
                            if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.disabled.length > 0) {
                            if (this.disabled.filter(v => { return this.year === v[0] && this.month === v[1] - 1 && i === v[2] }).length > 0) {
                                options.disabled = true
                            }
                        }
                    }

                    temp[line].push(options)
                } else { // 单选
                    

                    let chk = new Date()
                    let chkY = chk.getFullYear()
                    let chkM = chk.getMonth()
                    // 匹配上次选中的日期
                    if (parseInt(seletSplit[0]) == this.year && parseInt(seletSplit[1]) - 1 == this.month && parseInt(seletSplit[2]) == i) {
                        
                        temp[line].push(Object.assign(
                            { day: i, selected: true },
                            this.getLunarInfo(this.year, this.month + 1, i),
                            this.getEvents(this.year, this.month + 1, i),
                        ))
                        this.today = [line, temp[line].length - 1]
                    }
                    // 没有默认值的时候显示选中今天日期
                    else if (chkY == this.year && chkM == this.month && i == this.day && this.value == "") {
                        
                        temp[line].push(Object.assign(
                            { day: i, selected: true },
                            this.getLunarInfo(this.year, this.month + 1, i),
                            this.getEvents(this.year, this.month + 1, i),
                        ))
                        this.today = [line, temp[line].length - 1]
                    } else {
                        // 普通日期
                        
                        let options = Object.assign(
                            { day: i, selected: false },
                            this.getLunarInfo(this.year, this.month + 1, i),
                            this.getEvents(this.year, this.month + 1, i),
                        )
                        if (this.begin.length > 0) {
                            let beginTime = Number(new Date(parseInt(this.begin[0]), parseInt(this.begin[1]) - 1, parseInt(this.begin[2])))
                            if (beginTime > Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.end.length > 0) {
                            let endTime = Number(new Date(parseInt(this.end[0]), parseInt(this.end[1]) - 1, parseInt(this.end[2])))
                            if (endTime < Number(new Date(this.year, this.month, i))) options.disabled = true
                        }
                        if (this.disabled.length > 0) {
                            if (this.disabled.filter(v => { return this.year === v[0] && this.month === v[1] - 1 && i === v[2] }).length > 0) {
                                options.disabled = true
                            }
                        }
                        temp[line].push(options)
                    }
                }
                // 到周六换行
                if (day == 6 && i < lastDateOfMonth) {
                    line++
                } else if (i == lastDateOfMonth) {
                    // line++
                    let k = 1
                    for (let d = day; d < 6; d++) {
                        
                        temp[line].push(Object.assign(
                            { day: k, disabled: true },
                            this.getLunarInfo(this.computedNextYear(), this.computedNextMonth(true), k),
                            this.getEvents(this.computedNextYear(), this.computedNextMonth(true), k),
                        ))
                        k++
                    }
                    // 下个月除了补充的前几天开始的日期
                    nextMonthPushDays = k
                }
            } //end for

            
            // 补充第六行让视觉稳定
            if (line <= 5 && nextMonthPushDays > 0) {
                
                for (let i = line + 1; i <= 5; i++) {
                    temp[i] = []
                    let start = nextMonthPushDays + (i - line - 1) * 7
                    for (let d = start; d <= start + 6; d++) {
                        temp[i].push(Object.assign(
                            { day: d, disabled: true },
                            this.getLunarInfo(this.computedNextYear(), this.computedNextMonth(true), d),
                            this.getEvents(this.computedNextYear(), this.computedNextMonth(true), d),
                        ))
                    }
                }
            }
            this.days = temp
        },
        computedPrevYear() {
            let value = this.year
            if (this.month - 1 < 0) {
                value--
            }
            return value
        },
        computedPrevMonth(isString) {
            let value = this.month
            if (this.month - 1 < 0) {
                value = 11
            } else {
                value--
            }
            // 用于显示目的（一般月份是从0开始的）
            if (isString) {
                return value + 1
            }
            return value
        },
        computedNextYear() {
            let value = this.year
            if (this.month + 1 > 11) {
                value++
            }
            return value
        },
        computedNextMonth(isString) {
            let value = this.month
            if (this.month + 1 > 11) {
                value = 0
            } else {
                value++
            }
            // 用于显示目的（一般月份是从0开始的）
            if (isString) {
                return value + 1
            }
            return value
        },
        // 获取农历信息
        getLunarInfo(y, m, d) {
            let lunarInfo = calendar.solar2lunar(y, m, d)
            let lunarValue = lunarInfo.IDayCn
            
            let isLunarFestival = false
            let isGregorianFestival = false
            if (this.festival.lunar[lunarInfo.lMonth + "-" + lunarInfo.lDay] != undefined) {
                lunarValue = this.festival.lunar[lunarInfo.lMonth + "-" + lunarInfo.lDay]
                isLunarFestival = true
            } else if (this.festival.gregorian[m + "-" + d] != undefined) {
                lunarValue = this.festival.gregorian[m + "-" + d]
                isGregorianFestival = true
            }
            return {
                lunar: lunarValue,
                isLunarFestival: isLunarFestival,
                isGregorianFestival: isGregorianFestival,
            }
        },
        // 获取自定义事件
        getEvents(y, m, d) {
            if (Object.keys(this.events).length == 0) return false;
            let eventName = this.events[y + "-" + m + "-" + d]
            let data = {}
            if (eventName != undefined) {
                data.eventName = eventName
            }
            return data
        },
        // 上月
        prev(e) {
            e.stopPropagation()
            if (this.month == 0) {
                this.month = 11
                this.year = parseInt(this.year) - 1
            } else {
                this.month = parseInt(this.month) - 1
            }
            this.render(this.year, this.month)
            this.$emit('selectMonth', this.month + 1, this.year)
            this.$emit('prev', this.month + 1, this.year)
        },
        //  下月
        next(e) {
            e.stopPropagation()
            if (this.month == 11) {
                this.month = 0
                this.year = parseInt(this.year) + 1
            } else {
                this.month = parseInt(this.month) + 1
            }
            this.render(this.year, this.month)
            this.$emit('selectMonth', this.month + 1, this.year)
            this.$emit('next', this.month + 1, this.year)
        },
        // 选中日期
        select(k1, k2, e) {
            if (e != undefined) e.stopPropagation()
            // 日期范围
            if (this.range) {
                if (this.rangeBegin.length == 0 || this.rangeEndTemp != 0) {
                    this.rangeBegin = [this.year, this.month, this.days[k1][k2].day]
                    this.rangeBeginTemp = this.rangeBegin
                    this.rangeEnd = [this.year, this.month, this.days[k1][k2].day]
                    this.rangeEndTemp = 0

                } else {
                    this.rangeEnd = [this.year, this.month, this.days[k1][k2].day]
                    this.rangeEndTemp = 1
                    // 判断结束日期小于开始日期则自动颠倒过来
                    if (+new Date(this.rangeEnd[0], this.rangeEnd[1], this.rangeEnd[2]) < +new Date(this.rangeBegin[0], this.rangeBegin[1], this.rangeBegin[2])) {
                        this.rangeBegin = this.rangeEnd
                        this.rangeEnd = this.rangeBeginTemp
                    }
                    // 小于10左边打补丁
                    let begin = []
                    let end = []
                    if (this.zero) {
                        this.rangeBegin.forEach((v, k) => {
                            if (k == 1) v = v + 1
                            begin.push(this.zeroPad(v))
                        })
                        this.rangeEnd.forEach((v, k) => {
                            if (k == 1) v = v + 1
                            end.push(this.zeroPad(v))
                        })
                    } else {
                        begin = this.rangeBegin
                        end = this.rangeEnd
                    }
                    
                    this.$emit('select', begin, end)
                }
                this.render(this.year, this.month)
            } else if (this.multi) {
                // 如果已经选过则过滤掉
                let filterDay = this.multiDays.filter(v => {
                    return this.year === v[0] && this.month === v[1] - 1 && this.days[k1][k2].day === v[2]
                })
                if (filterDay.length > 0) {
                    this.multiDays = this.multiDays.filter(v => {
                        return this.year !== v[0] || this.month !== v[1] - 1 || this.days[k1][k2].day !== v[2]
                    })
                } else {
                    this.multiDays.push([this.year, this.month + 1, this.days[k1][k2].day]);
                }
                this.days[k1][k2].selected = !this.days[k1][k2].selected
                this.$emit('select', this.multiDays)
            } else {
                // 取消上次选中
                if (this.today.length > 0) {
                    this.days.forEach(v => {
                        v.forEach(vv => {
                            vv.selected = false
                        })
                    })
                }
                // 设置当前选中天
                this.days[k1][k2].selected = true
                this.day = this.days[k1][k2].day
                this.today = [k1, k2]
                this.$emit('select', [this.year, this.zero ? this.zeroPad(this.month + 1) : this.month + 1, this.zero ? this.zeroPad(this.days[k1][k2].day) : this.days[k1][k2].day])
            }
        },
        changeYear() {
            if (this.yearsShow) {
                this.yearsShow = false
                return false
            }
            this.yearsShow = true
            this.years = [];
            for (let i = ~~this.year - 10; i < ~~this.year + 10; i++) {
                this.years.push(i)
            }
        },
        selectYear(value) {
            this.yearsShow = false
            this.year = value
            this.render(this.year, this.month)
            this.$emit('selectYear', value)
        },
        // 返回今天
        setToday() {
            let now = new Date();
            this.year = now.getFullYear()
            this.month = now.getMonth()
            this.day = now.getDate()
            this.render(this.year, this.month)
            // 遍历当前日找到选中
            this.days.forEach(v => {
                let day = v.find(vv => {
                    return vv.day == this.day && !vv.disabled
                })
                if (day != undefined) {
                    day.selected = true
                }

            })
        },
        // 日期补零
        zeroPad(n) {
            return String(n < 10 ? '0' + n : n)
        },
    }
}

</script>



<style scoped>
.calendar {
    margin: auto;
    width: 100%;
    min-width: 300px;
    background: #fff;
    font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    user-select: none;
}

.calendar-tools {
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    color: #5e7a88;
}

.calendar-tools span {
    cursor: pointer;
}

.calendar-prev {
    width: 14.28571429%;
    float: left;
    text-align: center;
}

.calendar-info {
    padding-top: 3px;
    font-size: 16px;
    line-height: 1.3;
    text-align: center;
}

.calendar-info>div.month {
    margin: auto;
    height: 20px;
    width: 100px;
    text-align: center;
    color: #5e7a88;
    overflow: hidden;
    position: relative;
}

.calendar-info>div.month .month-inner {
    position: absolute;
    left: 0;
    top: 0;
    height: 240px;
    transition: top .5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.calendar-info>div.month .month-inner>span {
    display: block;
    font-size: 14px;
    height: 20px;
    width: 100px;
    overflow: hidden;
    text-align: center;
}

.calendar-info>div.year {
    font-size: 10px;
    line-height: 1;
    color: #999;
}

.calendar-next {
    width: 14.28571429%;
    float: right;
    text-align: center;
}

.calendar table {
    clear: both;
    width: 100%;
    margin-bottom: 10px;
    border-collapse: collapse;
    color: #444444;
}

.calendar td {
    margin: 2px 20px;
    padding: 0px 0;
    width: 14.28571429%;
    height: 44px;
    text-align: center;
    vertical-align: middle;
    font-size: 14px;
    line-height: 125%;
    cursor: pointer;
    position: relative;
    vertical-align: top;
}

.calendar td.week {
    font-size: 10px;
    pointer-events: none !important;
    cursor: default !important;
}

.calendar td.disabled {
    color: #ccc;
    pointer-events: none !important;
    cursor: default !important;
}

.calendar td.disabled div {
    color: #ccc;
}

.calendar td span {
    display: block;
    max-width: 40px;
    height: 26px;
    font-size: 16px;
    line-height: 26px;
    margin: 0px auto;
    border-radius: 20px;
}

.calendar td:not(.selected) span:not(.red):hover {
    background: #f3f8fa;
    color: #444;
}

.calendar td:not(.selected) span.red:hover {
    background: #f9efef;
}

.calendar td:not(.disabled) span.red {
    color: #ea6151;
}

.calendar td.selected span {
    background-color: #5e7a88;
    color: #fff;
}

.calendar td .text {
    top: 28px;
    left: 0;
    right: 0;
    text-align: center;
    padding: 2px;
    font-size: 8px;
    line-height: 1.2;
    color: #444;
    margin-bottom: 5px;
}

.calendar td .isGregorianFestival,
.calendar td .isLunarFestival {
    color: #ea6151;
}

.calendar td.selected span.red {
    background-color: #ea6151;
    color: #fff;
}

.calendar td.selected span.red:hover {
    background-color: #ea6151;
    color: #fff;
}

.calendar thead td {
    text-transform: uppercase;
    height: 30px;
    vertical-align: middle;
}

.calendar-button {
    text-align: center;
}

.calendar-button span {
    cursor: pointer;
    display: inline-block;
    min-height: 1em;
    min-width: 5em;
    vertical-align: baseline;
    background: #5e7a88;
    color: #fff;
    margin: 0 .25em 0 0;
    padding: .6em 2em;
    font-size: 1em;
    line-height: 1em;
    text-align: center;
    border-radius: .3em;
}

.calendar-button span.cancel {
    background: #efefef;
    color: #666;
}

.calendar-years {
    position: absolute;
    left: 0px;
    top: 60px;
    right: 0px;
    bottom: 0px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: auto;
    transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px);
}

.calendar-years.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0px);
}

.calendar-years>span {
    margin: 1px 5px;
    display: inline-block;
    width: 60px;
    line-height: 30px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid #fbfbfb;
    color: #999;
}

.calendar-years>span.active {
    border: 1px solid #5e7a88;
    background-color: #5e7a88;
    color: #fff;
}</style>
