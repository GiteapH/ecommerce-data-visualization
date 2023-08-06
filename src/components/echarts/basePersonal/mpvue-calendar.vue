<template>
  <echartDecoration title="用户历史购物信息">
    <div id="app" v-loading="loading">
      <div class="flex">
        <div>
          <el-row>
            <el-col :span="2">
              <el-row>
                <el-col :span="7">
                  <svg
                    t="1687662301935"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="2458"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M512 153.6c-123.477333 0-235.178667 51.9168-323.089067 137.557333C117.230933 360.96 68.266667 448.938667 68.266667 505.173333v13.6704c0 56.234667 48.981333 144.196267 120.644266 214.016C276.804267 818.466133 388.522667 870.4 512 870.4c123.613867 0 235.246933-51.234133 322.7648-135.970133 71.799467-69.5296 120.490667-157.320533 120.968533-215.296V505.173333c-0.477867-58.2656-49.169067-146.056533-120.968533-215.586133C747.246933 204.8512 635.5968 153.6 512 153.6z m0 68.266667c104.6528 0 199.799467 43.6736 275.268267 116.753066 59.886933 57.992533 99.8912 130.133333 100.1984 166.843734v13.380266c-0.3072 36.420267-40.311467 108.544-100.181334 166.536534C711.7824 758.459733 616.635733 802.133333 512 802.133333c-104.3456 0-199.560533-44.2368-275.456-118.186666C176.810667 625.7664 136.533333 553.4208 136.533333 518.843733V505.173333c0-34.577067 40.277333-106.922667 100.010667-165.12C312.439467 266.120533 407.6544 221.866667 512 221.866667z"
                      fill="#444444"
                      p-id="2459"
                    ></path>
                    <path
                      d="M512 341.333333c-94.2592 0-170.666667 76.407467-170.666667 170.666667s76.407467 170.666667 170.666667 170.666667 170.666667-76.407467 170.666667-170.666667-76.407467-170.666667-170.666667-170.666667z m0 68.266667a102.4 102.4 0 1 1 0 204.8 102.4 102.4 0 0 1 0-204.8z"
                      fill="#00B386"
                      p-id="2460"
                    ></path>
                  </svg>
                </el-col>
                <el-col :span="12">
                  <p class="t_d">浏览</p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col :span="7">
                  <svg
                    t="1687662498421"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5991"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M770.3 657.2c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128z m73.1 162.1C842 847 818.9 869 790.7 869c-15.9 0-31-7.1-41.1-19.5L708 808.2c-4.7-5-4.7-12.8 0-17.8 5-5.3 13.3-5.6 18.6-0.7l15 14.9v-90.4c0-7 5.7-12.7 12.7-12.7 7 0 12.7 5.7 12.7 12.7v37.4c0.2-6.9 5.8-12.3 12.7-12.3 6.9 0 12.5 5.4 12.7 12.3v9c0-7 5.7-12.7 12.7-12.7 7 0 12.7 5.7 12.7 12.7v14.8c0-7 5.7-12.6 12.7-12.6 7 0 12.7 5.6 12.8 12.6v43.9z"
                      fill="#FFAF35"
                      p-id="5992"
                    ></path>
                    <path
                      d="M623.1 786c0-80.6 65.4-146 146-146h1.2V148.2c0-27.5-22.5-50-50-50H180.2c-27.5 0-50 22.5-50 50v730.1c0 27.5 22.5 50 50 50h540.1c3.7 0 7.4-0.4 10.9-1.2C669 910.3 623.1 853.5 623.1 786zM322.2 352.1c0-17.7 14.5-32.2 32.2-32.2h319.7c17.7 0 32.2 14.5 32.2 32.2 0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2z m0 127.8c0-17.7 14.5-32.2 32.2-32.2h319.7c17.7 0 32.2 14.5 32.2 32.2 0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2zM199.7 343.7c4-4 10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1l-22.7-22.7c-3.8-3.9-3.8-10.4 0.1-14.4z m4 128c4-4 10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1l-22.7-22.7c-3.9-3.9-3.9-10.4 0.1-14.4z m95.6 109.7l-54.5 54.5c-3.3 3.3-8.3 3.8-12.2 1.7-1.1-0.5-2.1-1.2-3-2.1L207 612.9c-4-4-4-10.5 0-14.5s10.5-4 14.5 0l15.9 15.9 47.4-47.4c4-4 10.5-4 14.5 0s4 10.5 0 14.5z m279 26.4c0 17.7-14.5 32.2-32.2 32.2H354.4c-17.7 0-32.2-14.5-32.2-32.2 0-17.7 14.5-32.2 32.2-32.2H546c17.8-0.1 32.3 14.4 32.3 32.2z"
                      fill="#FFAF35"
                      p-id="5993"
                    ></path>
                  </svg>
                </el-col>
                <el-col :span="12">
                  <p class="t_d">下单</p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col :span="7">
                  <svg
                    t="1687662548193"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8290"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M508.416 510.72m-450.816 0a450.816 450.816 0 1 0 901.632 0 450.816 450.816 0 1 0-901.632 0Z"
                      fill="#FFE1E9"
                      p-id="8291"
                    ></path>
                    <path
                      d="M674.8672 555.3664c-4.6592 5.2224-12.4928 6.0416-17.9712 1.6384-16.9472-13.7728-52.8896-35.5328-95.5904-18.1248-59.648 24.32-76.032 104.7552-34.4064 150.2208 28.928 31.5392 85.3504 89.2416 117.1456 121.6a33.51552 33.51552 0 0 0 47.1552 0.6656c33.3824-32.0512 91.7504-88.2176 107.6736-104.6016 22.7328-23.3472 47.872-83.4048 12.288-136.0384-35.3792-52.48-108.4416-46.4896-136.2944-15.36z"
                      fill="#FF3369"
                      p-id="8292"
                    ></path>
                    <path
                      d="M483.1232 729.2928c-32.9728-35.9424-46.0288-87.04-34.8672-136.6528 11.1104-49.5104 45.0048-90.1632 90.6752-108.7488 40.6528-16.5888 84.4288-14.0288 124.16 6.4512 23.1424-12.6464 51.0464-19.0976 79.36-17.92 11.3664-46.08 8.8576-100.8128-25.4976-151.6544-63.232-93.5424-193.3312-82.8928-242.8928-27.392-8.2944 9.3184-22.272 10.752-31.9488 2.9184-30.1568-24.4736-94.1056-63.232-170.1888-32.256C165.7344 307.3024 136.4992 450.56 210.688 531.5072c51.456 56.1664 151.9616 158.8736 208.5888 216.4736 22.6816 23.04 59.4432 23.808 83.0976 1.9968-7.168-7.68-13.6704-14.6432-19.2512-20.6848z"
                      fill="#FF4D7C"
                      p-id="8293"
                    ></path>
                    <path
                      d="M674.8672 555.3664c-4.6592 5.2224-12.4928 6.0416-17.9712 1.6384-16.9472-13.7728-52.8896-35.5328-95.5904-18.1248-59.648 24.32-76.032 104.7552-34.4064 150.2208 14.4384 15.7696 35.7888 38.0416 57.4464 60.4672 73.216-54.0672 129.4848-129.7408 159.3856-217.6512-27.392-2.2016-54.3232 7.168-68.864 23.4496z"
                      fill="#FF4D7C"
                      p-id="8294"
                    ></path>
                    <path
                      d="M474.0608 293.3248c-8.2944 9.3184-22.272 10.752-31.9488 2.9184-30.1568-24.4736-94.1056-63.232-170.1888-32.256-106.1888 43.264-135.424 186.5216-61.2352 267.4688 29.4912 32.1536 74.9568 79.5136 119.1424 124.9792 42.0352-13.312 81.408-32.6144 117.0944-56.9344 0.4096-2.304 0.8192-4.5568 1.3312-6.8608 11.1104-49.5104 45.0048-90.1632 90.6752-108.7488 10.1376-4.1472 20.4288-7.0656 30.8224-8.8576a448.07168 448.07168 0 0 0 73.216-213.1456c-62.3616-23.7056-134.7584-6.7584-168.9088 31.4368z"
                      fill="#FF5F89"
                      p-id="8295"
                    ></path>
                    <path
                      d="M466.8416 298.8544c-7.8848 3.9424-17.5104 3.2768-24.7808-2.6112-30.1568-24.4736-94.1056-63.232-170.1888-32.256-95.0784 38.7584-128.4096 157.6448-81.1008 240.1792 116.9408-29.4912 215.6032-104.6016 276.0704-205.312z"
                      fill="#FF7196"
                      p-id="8296"
                    ></path>
                  </svg>
                </el-col>
                <el-col :span="12">
                  <p class="t_d">收藏</p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2">
              <el-row>
                <el-col :span="7">
                  <svg
                    t="1687662586936"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="9852"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M359.5264 793.856h222.8736c3.8912 0 7.68 1.1264 10.9056 3.2768l127.8464 84.6848c29.6448 19.6608 69.2736-1.6384 69.2224-37.2224l-0.0512-30.9248c0-10.9056 8.8064-19.7632 19.7632-19.7632h31.1296c63.488 0 114.9952-51.5072 114.9952-114.9952V361.0624c0-63.488-51.5072-114.9952-114.9952-114.9952H359.5264c-63.488 0-114.9952 51.5072-114.9952 114.9952v317.7984c-0.0512 63.5392 51.456 114.9952 114.9952 114.9952z"
                      fill="#5EEFB7"
                      p-id="9853"
                    ></path>
                    <path
                      d="M734.208 757.8624H485.2736c-4.352 0-8.5504 1.28-12.1856 3.6864l-167.6288 111.0528c-22.4768 14.8992-52.48-1.28-52.48-28.2112l0.1024-64.4096c0-12.1856-9.8304-22.0672-22.0672-22.0672h-34.7648c-70.912 0-128.4608-57.4976-128.4608-128.4608V274.5344c0-70.912 57.4976-128.4608 128.4608-128.4608H734.208c70.912 0 128.4608 57.4976 128.4608 128.4608v354.9184c-0.0512 70.912-57.5488 128.4096-128.4608 128.4096z"
                      fill="#4BE2AC"
                      p-id="9854"
                    ></path>
                    <path
                      d="M359.5264 246.0672c-63.488 0-114.9952 51.5072-114.9952 114.9952v317.7984c0 63.488 51.5072 114.9952 114.9952 114.9952h64.768l48.8448-32.3584c3.584-2.4064 7.8336-3.6864 12.1856-3.6864h248.9344c70.912 0 128.4608-57.4976 128.4608-128.4608v-354.816c0-9.216-0.9728-18.2272-2.8672-26.9312-6.0928-0.9728-12.288-1.536-18.6368-1.536H359.5264z"
                      fill="#06CC76"
                      p-id="9855"
                    ></path>
                    <path
                      d="M670.0544 361.6256H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h390.4c22.6304 0 40.96 18.3296 40.96 40.96s-18.2784 40.96-40.9088 40.96zM670.0544 500.992H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h390.4c22.6304 0 40.96 18.3296 40.96 40.96s-18.2784 40.96-40.9088 40.96zM466.5856 640.3584H279.6032c-22.6304 0-40.96-18.3296-40.96-40.96s18.3296-40.96 40.96-40.96h186.9824c22.6304 0 40.96 18.3296 40.96 40.96s-18.3296 40.96-40.96 40.96z"
                      fill="#FFFFFF"
                      p-id="9856"
                    ></path>
                  </svg>
                </el-col>
                <el-col :span="12">
                  <p class="t_d">评论</p>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6">
              <el-row>
                <el-col :span="3">
                  <svg
                    t="1687662662409"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="13505"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M823.786667 693.333333l37.418666-467.626666-383.637333 18.261333L440.106667 693.333333h383.68z m-397.034667 31.936a21.333333 21.333333 0 0 1-19.498667-23.04l39.189334-470.250666a21.333333 21.333333 0 0 1 20.266666-19.541334l405.077334-19.285333a21.333333 21.333333 0 0 1 22.272 23.018667L854.912 705.706667a21.333333 21.333333 0 0 1-21.269333 19.626666h-405.12a21.333333 21.333333 0 0 1-1.770667-0.064z"
                      fill="#F85600"
                      p-id="13506"
                    ></path>
                    <path
                      d="M881.664 441.941333l-26.325333 251.477334a21.333333 21.333333 0 0 1-21.162667 19.114666l-408.192 1.024 23.488-307.242666 411.605333 12.074666a21.333333 21.333333 0 0 1 20.586667 23.552z"
                      fill="#FFB468"
                      p-id="13507"
                    ></path>
                    <path
                      d="M425.984 713.557333l-217.386667-120.981333a42.666667 42.666667 0 0 1-21.461333-31.146667L152.661333 324.096a21.333333 21.333333 0 0 1 28.906667-22.933333l267.904 105.152-23.488 307.242666z"
                      fill="#FF7325"
                      p-id="13508"
                    ></path>
                    <path
                      d="M172.757333 297.557333L597.333333 277.333333l-21.333333 320H229.013333a42.666667 42.666667 0 0 1-42.24-36.629333l-34.133333-238.826667a21.333333 21.333333 0 0 1 20.117333-24.32z"
                      fill="#FF962A"
                      p-id="13509"
                    ></path>
                    <path
                      d="M882.581333 433.770667l-26.24 261.76a21.333333 21.333333 0 0 1-30.186666 17.258666L576 597.333333l21.333333-320 273.493334 135.189334a21.333333 21.333333 0 0 1 11.754666 21.248z"
                      fill="#FF7325"
                      p-id="13510"
                    ></path>
                    <path
                      d="M586.368 466.304l279.381333 135.082667-2.261333 22.549333-280.234667-135.509333 1.173334-17.493334 1.941333-4.629333z m5.290667-104.106667l284.309333 137.450667-2.261333 22.570667-283.562667-137.130667 1.514667-22.890667z"
                      fill="#EC5702"
                      p-id="13511"
                    ></path>
                    <path
                      d="M219.52 597.333333h348.330667a42.666667 42.666667 0 0 1 15.722666 3.008l263.061334 104.405334a10.666667 10.666667 0 0 1-3.925334 20.586666H431.978667a42.666667 42.666667 0 0 1-19.733334-4.821333l-197.674666-103.04A10.666667 10.666667 0 0 1 219.52 597.333333z"
                      fill="#FC280E"
                      p-id="13512"
                    ></path>
                    <path
                      d="M597.76 278.016c2.666667 0.618667 6.592 2.069333 11.754667 4.416l-19.328 288.192c-0.832 12.202667-0.405333 20.416 1.28 24.64 1.173333 3.008 6.336 7.786667 15.424 14.336l239.744 95.146667a10.666667 10.666667 0 0 1-3.925334 20.586666H431.978667a42.666667 42.666667 0 0 1-19.733334-4.821333l-197.674666-103.04A10.666667 10.666667 0 0 1 219.52 597.333333h318.122667c14.122667-2.282667 22.357333-5.461333 24.682666-9.557333 3.328-5.866667 5.205333-12.074667 5.632-18.666667l19.136-291.797333c4.458667-0.128 8.021333 0.106667 10.666667 0.704zM567.850667 618.666667H263.04l159.082667 82.922666a21.333333 21.333333 0 0 0 9.856 2.410667h354.944l-211.2-83.84a21.333333 21.333333 0 0 0-7.893334-1.493333z"
                      fill="#FFB468"
                      p-id="13513"
                    ></path>
                    <path
                      d="M671.765333 652.650667l21.12 2.965333-12.373333 88.469333a10.666667 10.666667 0 0 1-10.581333 9.173334H324.373333a10.666667 10.666667 0 0 1-10.517333-12.437334l12.373333-72.490666 21.034667 3.584-10.24 60.032h323.626667l11.093333-79.296zM818.325333 714.794667l21.205334 2.304-9.472 87.04-21.205334-2.304z"
                      fill="#FFB468"
                      p-id="13514"
                    ></path>
                    <path
                      d="M396.437333 707.306667l21.290667 1.28-4.608 77.354666-21.290667-1.28z"
                      fill="#FFB468"
                      p-id="13515"
                    ></path>
                    <path
                      d="M242.837333 725.504l-2.24 0.426667C225.173333 729.706667 213.333333 751.872 213.333333 778.666667c0 29.44 14.336 53.333333 32 53.333333l1.322667-0.042667v0.106667L224 832C206.336 832 192 808.106667 192 778.666667s14.336-53.333333 32-53.333334l18.837333 0.170667zM562.837333 725.504l-2.24 0.426667C545.173333 729.706667 533.333333 751.872 533.333333 778.666667c0 29.44 14.336 53.333333 32 53.333333l1.322667-0.042667v0.106667L544 832c-17.664 0-32-23.893333-32-53.333333s14.336-53.333333 32-53.333334l18.837333 0.170667z"
                      fill="#FF5C00"
                      p-id="13516"
                    ></path>
                    <path
                      d="M213.333333 778.666667a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z"
                      fill="#ED0808"
                      p-id="13517"
                    ></path>
                    <path
                      d="M533.333333 778.666667a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z"
                      fill="#ED0808"
                      p-id="13518"
                    ></path>
                    <path
                      d="M456.170667 832.170667l-2.24 0.426666C438.506667 836.373333 426.666667 858.538667 426.666667 885.333333c0 29.44 14.336 53.333333 32 53.333334l1.322666-0.042667v0.106667L437.333333 938.666667c-17.664 0-32-23.893333-32-53.333334s14.336-53.333333 32-53.333333l18.837334 0.170667z"
                      fill="#FF5C00"
                      p-id="13519"
                    ></path>
                    <path
                      d="M426.666667 885.333333a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z"
                      fill="#ED0808"
                      p-id="13520"
                    ></path>
                    <path
                      d="M818.837333 832.170667l-2.24 0.426666C801.173333 836.373333 789.333333 858.538667 789.333333 885.333333c0 29.44 14.336 53.333333 32 53.333334l1.322667-0.042667v0.106667L800 938.666667c-17.664 0-32-23.893333-32-53.333334s14.336-53.333333 32-53.333333l18.837333 0.170667z"
                      fill="#FF5C00"
                      p-id="13521"
                    ></path>
                    <path
                      d="M789.333333 885.333333a53.333333 32 90 1 0 64 0 53.333333 32 90 1 0-64 0Z"
                      fill="#ED0808"
                      p-id="13522"
                    ></path>
                    <path
                      d="M855.04 174.528l28.842667-1.493333a21.333333 21.333333 0 0 1 22.4 22.677333l-2.261334 34.922667a21.333333 21.333333 0 0 1-15.786666 19.242666 22.613333 22.613333 0 0 0-11.754667-0.213333c-3.626667 0.981333-8.704 3.434667-15.168 7.381333h-0.106667a21.333333 21.333333 0 0 1-26.816-20.821333l0.426667-40.618667a21.333333 21.333333 0 0 1 20.245333-21.077333zM482.901333 194.602667l-27.093333 0.810666a21.333333 21.333333 0 0 0-20.693333 21.333334l0.042666 28.778666c0 7.338667 4.629333 13.866667 11.541334 16.341334a22.613333 22.613333 0 0 1 11.733333-0.213334c3.626667 0.981333 8.704 3.413333 15.168 7.36l2.197333 0.597334a21.333333 21.333333 0 0 0 26.773334-19.178667l2.261333-33.066667a21.333333 21.333333 0 0 0-21.930667-22.762666z"
                      fill="#FFB333"
                      p-id="13523"
                    ></path>
                    <path
                      d="M567.168 682.666667a42.666667 42.666667 0 0 1 16.938667 3.498666l240.554666 104.042667 0.512 0.256c5.461333 1.066667 8.746667 2.837333 9.898667 5.333333v16.490667c13.418667 6.613333 20.373333 13.653333 20.885333 21.077333 0.746667 11.136-6.037333 52.373333-13.738666 65.194667-7.701333 12.8-21.248 10.112-25.728-8.426667-4.48-18.56-2.816-49.024-8.042667-52.586666-5.226667-3.584-14.592-5.888-21.674667 1.258666-10.026667 10.090667-16.810667 32.64-15.786666 51.434667-6.869333-9.749333-0.042667-54.016 2.197333-62.954667 1.493333-5.973333 7.466667-10.816 17.92-14.549333l0.042667-2.090667H472.405333v1.642667c12.202667 6.037333 19.050667 12.373333 20.586667 19.072l0.298667 2.005333c0.746667 11.136-6.037333 52.373333-13.738667 65.194667-7.701333 12.8-21.248 10.112-25.728-8.426667-4.48-18.56-2.816-49.024-8.042667-52.586666-5.226667-3.584-14.592-5.888-21.674666 1.258666-10.026667 10.090667-16.810667 32.64-15.786667 51.434667-6.869333-9.749333-0.042667-54.016 2.197333-62.954667 1.493333-5.973333 7.466667-10.816 17.92-14.549333l0.085334-2.858667a42.666667 42.666667 0 0 1-10.88-3.712l-138.133334-69.12c-1.664 16.704-7.189333 44.693333-13.290666 54.826667-7.701333 12.842667-21.248 10.133333-25.728-8.405333-4.48-18.56-2.816-49.024-8.042667-52.586667-5.226667-3.584-14.592-5.888-21.674667 1.258667-10.026667 10.090667-16.810667 32.64-15.786666 51.434666-6.869333-9.749333-0.042667-54.016 2.197333-62.954666 1.493333-5.973333 7.466667-10.816 17.92-14.549334l0.021333-1.173333-4.053333-2.026667a10.666667 10.666667 0 0 1 4.778667-20.202666h351.317333z m-32.021333 21.312L261.034667 704l166.165333 83.072a21.333333 21.333333 0 0 0 9.536 2.261333h125.696a36.394667 36.394667 0 0 1-1.92-5.866666c-4.48-18.56-2.837333-49.024-8.064-52.586667-5.226667-3.584-14.592-5.888-21.674667 1.258667-10.026667 10.090667-16.810667 32.64-15.786666 51.434666-6.869333-9.749333-0.042667-54.016 2.197333-62.954666 1.493333-5.973333 7.466667-10.816 17.92-14.549334l0.042667-2.090666z m54.293333 7.744c6.656 4.8 10.154667 9.792 10.517333 14.976 0.746667 11.136-6.037333 52.373333-13.738666 65.194666l1.322666-2.581333 181.333334 0.021333z"
                      fill="#FF962A"
                      p-id="13524"
                    ></path>
                    <path
                      d="M298.453333 452.736v42.666667c0 4.693333-3.818667 8.661333-8.533333 8.832l-16.554667 0.554666a8.192 8.192 0 0 1-8.533333-8.234666v-42.666667l-16.661333 0.576a8.192 8.192 0 0 1-8.533334-8.234667v-17.066666c0-4.693333 3.818667-8.661333 8.533334-8.832l66.965333-2.304c4.693333-0.170667 8.533333 3.52 8.533333 8.234666v17.066667c0 4.714667-3.84 8.661333-8.533333 8.832l-16.682667 0.576z m83.157334-31.552l36.16 66.069333a8.746667 8.746667 0 0 1-3.477334 11.669334 8.746667 8.746667 0 0 1-4.053333 1.152l-72.32 2.496a8.192 8.192 0 0 1-8.533333-8.234667 8.746667 8.746667 0 0 1 1.024-4.074667l36.16-68.544a8.746667 8.746667 0 0 1 11.562666-3.882666 8.106667 8.106667 0 0 1 3.477334 3.349333z m93.333333 76.650667c-23.210667 0.810667-42.026667-17.642667-42.026667-41.216 0-23.552 18.816-43.306667 42.026667-44.117334 23.210667-0.789333 42.026667 17.664 42.026667 41.216 0 23.573333-18.816 43.306667-42.026667 44.117334z"
                      fill="#FC280E"
                      p-id="13525"
                    ></path>
                    <path
                      d="M293.504 437.44v42.666667c0 4.693333-3.84 8.661333-8.533333 8.832l-16.554667 0.554666a8.192 8.192 0 0 1-8.533333-8.234666v-42.666667l-16.682667 0.576a8.192 8.192 0 0 1-8.533333-8.234667v-17.066666c0-4.693333 3.84-8.661333 8.533333-8.832l66.986667-2.304c4.693333-0.170667 8.533333 3.52 8.533333 8.234666v17.066667c0 4.693333-3.84 8.661333-8.533333 8.832l-16.682667 0.576z m83.136-31.552l36.16 66.048a8.746667 8.746667 0 0 1-3.477333 11.690667 8.746667 8.746667 0 0 1-4.053334 1.152l-72.298666 2.496a8.192 8.192 0 0 1-8.533334-8.234667 8.746667 8.746667 0 0 1 1.024-4.074667l36.16-68.544a8.746667 8.746667 0 0 1 11.541334-3.882666 8.106667 8.106667 0 0 1 3.477333 3.349333z m93.333333 76.650667c-23.210667 0.810667-42.026667-17.642667-42.026666-41.216 0-23.552 18.816-43.306667 42.026666-44.117334 23.210667-0.789333 42.026667 17.664 42.026667 41.216 0 23.573333-18.816 43.306667-42.026667 44.117334z"
                      fill="#FFECDB"
                      p-id="13526"
                    ></path>
                  </svg>
                </el-col>
                <el-col :span="12">
                  <p class="t_d">加入购物车</p>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <Calendar
            ref="calendarRef"
            :events="calendar.events"
            :lunar="calendar.lunar"
            :value="calendar.value"
            lang="zh-cn"
            :begin="calendar.begin"
            :end="calendar.end"
            :weeks="calendar.weeks"
            :months="calendar.months"
            @select="select"
            @selectMonth="selectMonth"
            style="width: 100%; height: 100%"
            @selectYear="selectYear"
          >
          </Calendar>
        </div>
        <div
          id="diff"
          :style="{ width: `${width}`, height: `${height}` }"
        ></div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="用户在当日的具体操作信息"
      style="width: 600px"
    >
      <el-table :data="gridData" style="height: 700px">
        <el-table-column label="用户id" width="90">
          <template #default="scope">
            {{ scope.row["user"] }}
          </template>
        </el-table-column>
        <el-table-column label="操作时间" width="180">
          <template #default="scope">
            {{
              `${scope.row.actDate.join("-")} ${scope.row.actTime.join(":")}`
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作类型" width="180">
          <template #default="scope">
            {{ `${actTypeStr(scope.row.actType)}` }}
          </template>
        </el-table-column>
        <el-table-column label="商品id" width="100">
          <template #default="scope">
            {{ scope.row["sku"] }}
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </echartDecoration>
</template>
    
<script setup>
let map2 = new Map();
import Calendar from "../../utils/calendar/calendar.vue";
import { get } from "@/utils/axiosConfig/axios";
import echartDecoration from "../../utils/echartDecoration.vue";
import * as echarts from "echarts";
import { setBuyChangeConfig } from "@/utils/js/echartsConfig/basePersonal/buyChangeConfig";
import { onMounted, ref, getCurrentInstance } from "vue";

var myChart, xDataE, dataE;
const { proxy } = getCurrentInstance();
const dialogVisible = ref(false);
const gridData = ref([]);
const calendarRef = ref();
const calendar = ref({
  value: [2018, 4, 15], //默认日期
  // lunar:true, //显示农历
  events: {},
  timestamp: Date.now(),
});
const loading = ref(true);
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "200px",
  },
});

const getEvents = (id) => {
  loading.value = true;
  get({
    url: "/user-act/AllCountById",
    params: {
      userId: id,
    },
  }).then((res) => {
    let map = new Map();
    map2 = new Map();
    for (let data of res) {
      let date = data.actDate.join("-");
      if (map.has(date)) {
        map.get(date).add(data.actType);
        map2.get(date).push(data);
      } else {
        let t = new Set();
        t.add(data.actType);
        map.set(date, t);
        map2.set(date, [data]);
      }
    }

    map.forEach((value, key) => {
      value.forEach((v) => {
        if (key in calendar.value.events) {
          calendar.value.events[key] = calendar.value.events[key] + "" + v;
        } else {
          calendar.value.events[key] = "" + v;
        }
      });
    });
    calendarRef.value.prev(window.event);
    calendarRef.value.next(window.event);
    loading.value = false;
  });
};
const chartDraw = (id) => {
  var chartDom = document.getElementById("diff");
  myChart = echarts.init(chartDom);
  proxy.$showLoading(myChart);
  setBuyChangeConfig(id).then(({ option, xData, data }) => {
    myChart.hideLoading();
    xDataE = xData;
    dataE = data;
    myChart.setOption(option);
  });
  window.addEventListener("resize", () => {
    myChart.resize();
  });
};

const getEcharts = () => {
  return [myChart, xDataE, dataE];
};
const select = (value) => {
  if (map2.has(value.join("-"))) {
    gridData.value = [...map2.get(value.join("-"))];
    dialogVisible.value = true;
  }
};
const selectMonth = (month, year) => {};
const selectYear = (year) => {};

onMounted(() => {
  getEvents(1);
  chartDraw(1);
});

defineExpose({
  getEvents,
  chartDraw,
  getEcharts,
});
</script>
    
<style>
/*demo*/
.flex {
  box-sizing: border-box;

  display: -webkit-box;
  -webkit-box-pack: start;
  -webkit-box-align: start;

  display: -webkit-flex;
  -webkit-justify-content: space-between;
  -webkit-align-items: top;

  display: flex;
  justify-content: space-between;
  align-items: top;
  flex-flow: row wrap;
}

.flex > div {
  margin: 10px;
  padding: 20px;
  width: 100%;
  min-width: 300px;
  border: 1px solid #eee;
  border-radius: 2px;
  position: relative;
}

.flex > div > span {
  position: absolute;
  left: 0px;
  top: 0px;
  padding: 5px 10px;
  font-family: "PingFang SC", "Hiragino Sans GB", "STHeiti", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
  font-size: 10px;
  border-radius: 0 0 2px 0;
  background: #ea6151;
  color: #fff;
}

.flex > div > input {
  box-sizing: border-box;
  width: 100%;
  margin-top: 20px;
  border-radius: 2px;
  border: 1px solid #dedede;
  padding: 10px;
  font-size: 16px;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWwpAZm9udC1mYWNlIHsgZm9udC1mYW1pbHk6IGlmb250OyBzcmM6IHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUuZW90PyNpZWZpeCIpIGZvcm1hdCgiZW1iZWRkZWQtb3BlbnR5cGUiKSwgdXJsKCIvL2F0LmFsaWNkbi5jb20vdC9mb250XzE0NDIzNzM4OTZfNDc1NDQ1NS53b2ZmIikgZm9ybWF0KCJ3b2ZmIiksIHVybCgiLy9hdC5hbGljZG4uY29tL3QvZm9udF8xNDQyMzczODk2XzQ3NTQ0NTUudHRmIikgZm9ybWF0KCJ0cnVldHlwZSIpLCB1cmwoIi8vYXQuYWxpY2RuLmNvbS90L2ZvbnRfMTQ0MjM3Mzg5Nl80NzU0NDU1LnN2ZyNpZm9udCIpIGZvcm1hdCgic3ZnIik7IH0KCl1dPjwvc3R5bGU+PC9kZWZzPjxnIGNsYXNzPSJ0cmFuc2Zvcm0tZ3JvdXAiPjxnIHRyYW5zZm9ybT0ic2NhbGUoMC4wMTU2MjUsIDAuMDE1NjI1KSI+PHBhdGggZD0iTTcxMS4zMDYyIDI5MC42OTcyYzI0LjI4MjEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTU0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMjYgMC00My45ODggMTkuNzI4NC00My45ODggNDQuMDUzNXYyMDAuMTA0OTZDNjY3LjMxODMgMjcwLjk5MDMgNjg3LjAwMzYgMjkwLjY5NzIgNzExLjMwNjIgMjkwLjY5NzJ6TTYyMy40ODA4IDExMy40MjAzSDQwMC43NjQ5Mjh2NjYuNTEzOTJoMjIyLjcxNTkwNDAwMDAwMDAyVjExMy40MjAyODh6TTg4NC4wNTMgMTEzLjQyMDNoLTgyLjc3NDAxNnY2Ni4xNDUyOGg4NS45NDAyMjRjMjUuMjc4NSAwIDQ2LjYxMTUgMjEuMzc2IDQ2LjYxMTUgNDYuNjc3djE1My45Mjc2OEg5MC40Mzg2NTYwMDAwMDAwMXYtMTUzLjkyNzY4YzAtMjUuMyAyMS4zMzMtNDYuNjc3IDQ2LjYxMTUtNDYuNjc3aDg2LjUwMzQyNFYxMTMuNDIwMjg4aC04Mi42NDI5NDRjLTY0LjA4NiAwLTExNi41MDc2IDUyLjUwODctMTE2LjUwNzYgMTE2LjcwMzJ2Njc2LjgwMTUzNTk5OTk5OTljMCA2NC4xNzQxIDUwLjQ5MTQgMTE2LjY4MDcgMTE0LjU3NzQgMTE2LjY4MDdIODg0LjA1Mjk5MmM2NC4wNjI1IDAgMTE2LjUwNjYtNTIuNTA2NiAxMTYuNTA2Ni0xMTYuNjgwN1YyMzAuMTIzNTE5OTk5OTk5OThDMTAwMC41NTk2IDE2NS45MjkgOTQ4LjExNDQgMTEzLjQyMDMgODg0LjA1MyAxMTMuNDIwM3pNOTMzLjgyOTYgOTEwLjM1MTRjMCAyNS4zLTIxLjMzMyA0Ni42NzYtNDYuNjExNSA0Ni42NzZIMTM3LjA1MDExMTk5OTk5OTk4Yy0yNS4yNzg1IDAtNDYuNjExNS0yMS4zNzYtNDYuNjExNS00Ni42NzZWNDQ2LjQ0NTU2OEg5MzMuODI5NjMyVjkxMC4zNTEzNnpNMjY3LjEwODQgNjQ2LjE4MTljMzYuODc3MyAwIDY2Ljc1MjUtMjkuOTM5NyA2Ni43NTI1LTY2Ljg4MTUgMC0zNi45MjI0LTI5Ljg3NTItNjYuODYxMS02Ni43NTI1LTY2Ljg2MTEtMzYuODU0OCAwLTY2Ljc1MjUgMjkuOTM5Ny02Ni43NTI1IDY2Ljg2MTFDMjAwLjM1NTggNjE2LjI0MjIgMjMwLjI1MjUgNjQ2LjE4MTkgMjY3LjEwODQgNjQ2LjE4MTl6TTUxMS41NDg0IDY0Ni4xODE5YzM2Ljg1NTggMCA2Ni43NTI1LTI5LjkzOTcgNjYuNzUyNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTU3LTY2Ljg2MTEtNjYuNzUyNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzQ0NC43OTU5IDYxNi4yNDIyIDQ3NC42NzExIDY0Ni4xODE5IDUxMS41NDg0IDY0Ni4xODE5ek0yNjUuOTE2NCA4OTAuNzA5YzM2Ljg3NzMgMCA2Ni43NTE1LTI5LjkzOTcgNjYuNzUxNS02Ni44NjExIDAtMzYuOTQyOC0yOS44NzQyLTY2Ljg4MjYtNjYuNzUxNS02Ni44ODI2LTM2Ljg1NTggMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44ODI2QzE5OS4xNjM5IDg2MC43NjkzIDIyOS4wNTk2IDg5MC43MDkgMjY1LjkxNjQgODkwLjcwOXpNNTExLjU0ODQgODkwLjcwOWMzNi44NTU4IDAgNjYuNzUyNS0yOS45Mzk3IDY2Ljc1MjUtNjYuODYxMSAwLTM2Ljk0MjgtMjkuODk1Ny02Ni44ODI2LTY2Ljc1MjUtNjYuODgyNi0zNi44NzczIDAtNjYuNzUyNSAyOS45Mzk3LTY2Ljc1MjUgNjYuODgyNkM0NDQuNzk1OSA4NjAuNzY5MyA0NzQuNjcxMSA4OTAuNzA5IDUxMS41NDg0IDg5MC43MDl6TTc1NS42NDEzIDY0Ni4xODE5YzM2Ljg1NjggMCA2Ni43NTM1LTI5LjkzOTcgNjYuNzUzNS02Ni44ODE1IDAtMzYuOTIyNC0yOS44OTY3LTY2Ljg2MTEtNjYuNzUzNS02Ni44NjExLTM2Ljg3NzMgMC02Ni43NTI1IDI5LjkzOTctNjYuNzUyNSA2Ni44NjExQzY4OC44ODk5IDYxNi4yNDIyIDcxOC43NjQgNjQ2LjE4MTkgNzU1LjY0MTMgNjQ2LjE4MTl6TTMxMS43MDM2IDI5MC42OTcyYzI0LjI4MTEgMCA0NS4zNzY1LTE5LjcwNjkgNDUuMzc2NS00NC4wMzJWNDYuNTYwMjU1OTk5OTk5OTk1YzAtMjQuMzI1MS0yMS4wOTQ0LTQ0LjA1MzUtNDUuMzc2NS00NC4wNTM1LTI0LjMwMTYgMC00My45ODkgMTkuNzI4NC00My45ODkgNDQuMDUzNXYyMDAuMTA0OTZDMjY3LjcxNDYgMjcwLjk5MDMgMjg3LjQwMiAyOTAuNjk3MiAzMTEuNzAzNiAyOTAuNjk3MnoiIGZpbGw9IiM1ZTdhODgiPjwvcGF0aD48L2c+PC9nPjwvc3ZnPg==)
    no-repeat 8px 10px;
  padding-left: 36px;
  color: #666;
}

/*transition*/
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
  transform: translateY(-10px);
}

/*下拉框*/
.calendar-dropdown {
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}

.calendar-dropdown:before {
  position: absolute;
  left: 30px;
  top: -10px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #dedede;
}

.calendar-dropdown:after {
  position: absolute;
  left: 30px;
  top: -9px;
  content: "";
  border: 5px solid rgba(0, 0, 0, 0);
  border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.calendar-dialog-mask {
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
}

.calendar-dialog-body {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 2px;
}

.t_d {
  color: gray;
  font-size: 15px;
  font-weight: 500;
}
</style>