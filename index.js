$(document).ready(function () {
    const API_URL = 'https://portfolio-backend-kdud.onrender.com/';
    //render function when load page
    callApiGetAllProjects()
    callApiGetAppCertificate()
    // set background light when scroll follow the height over 20
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass('sticky');
            $('.goTop').fadeIn()
        } else {
            $('.navbar').removeClass('sticky');
            $('.goTop').fadeOut()
        }
    })
    $('.goTop').click(function () {
        scroll(0, 0)
    })
    // set toggle for navbar
    $('.menu-toggle').click(function () {
        $(this).toggleClass('active')
        $('.navbar-menu').toggleClass('active')
    })
    $('#submit-btn').click((e) => {
        e.preventDefault()
        onBtnSubmitMessageClick()
    })
    async function onBtnSubmitMessageClick() {
        let contactObj = {
            name: '',
            email: '',
            address: '',
            message: ''
        }
        getFormContact(contactObj)
        const SERVICE_ID = "service_7xqk2q9";
        const TEMPLATE_ID = "template_s2bkuyu";
        try {
            const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, contactObj)
            $('#contact-form')[0].reset()
            alert("Your message was sent successfully");
        } catch (error) {
            alert("Sorry, the error happened. Please try again");
        }
    }

    // function download cv
    $('.download_cv').click(function () {
        const fileName = 'Van_Ngoc_Phuong_Web_developer.pdf'
        const filePath = './Van_Ngoc_Phuong_Web_developer.pdf'
        const link = document.createElement('a')
        link.setAttribute('href', fileName)
        link.setAttribute('download', filePath)
        link.style.display = 'none'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    })
    // get form contact
    function getFormContact(paramContact) {
        let data = $('#contact-form').serializeArray()
        paramContact.message = $('#contact-message').val()
        $.each(data, function (_, field) {
            paramContact[field.name] = field.value

        })
    }
    // render project dynamic
    function renderProject(paramData) {
        let project
        if (!paramData) {
            project = Array.from({ length: 3 }, (_, i) => `
            <div class="works-skeleton">
              <div  class="work_annimation" >
              </div>
            </div>
        `);
        }
        else {
            project = paramData.map(item => {
                return `
                <a href=${item.link} class="work" target="_blank">
                    <img src=${item.image} alt=${item.title}>
                    <div class="info">
                        <h3>${item.title}</h3>
                        <div class="cat">${item.name}</div>
                        <div class="cat">${item.description}</div>
                        <div class="cat">Click to see...</div>
                    </div>
                </a>
        `
            })
        }
        $('#works-inner').append(project)
    }
    // function call api get data
    function callApiGetAllProjects() {
        $.ajax({
            type: 'GET',
            url: API_URL + 'projects',
            dataType: 'json',
            async: false,
            success: function (res) {
                renderProject(res)
            },
            error: function (err) {
                renderProject([])
            }
        })
    }
    function renderCertificate(paramData) {
        let certificate;
        if (!paramData) {
            certificate = Array.from({ length: 3 }, (_, i) => `
            <div class="works-skeleton">
              <div  class="work_annimation" >
              </div>
            </div>
        `);
        }
        else {
            certificate = paramData.map(item => {
                return `
                 <div class="service">
                    <a href=${item.link}  target="_blank">
                        <img src=${item.image} alt=${item.name}>
                    </a>
                </div>
        `
            })
            $('#services-inner').append(certificate)
        }
    }
        // call api get all certificate
        function callApiGetAppCertificate() {
            $.ajax({
                type: 'GET',
                url: API_URL + 'certificates',
                dataType: 'json',
                async: false,
                success: function (res) {
                    renderCertificate(res)
                },
                error: function (err) {
                    renderCertificate([])
                }
            })
        }
    })
 /// make the photo with popup effect
    // $('.works').magnificPopup({
    //     delegate: 'a',
    //     type: 'image',
    //     gallery: {enabled: true}
    // })
    // gotop button
    // get width of skill bard