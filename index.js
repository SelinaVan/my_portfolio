$(document).ready(function () {
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
        const fileName = 'CV_Van_Ngoc_Phuong_Fullstack_Developer.pdf'
        const filePath = './CV_Van_Ngoc_Phuong_Fullstack_Developer.pdf'
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

})
 /// make the photo with popup effect
    // $('.works').magnificPopup({
    //     delegate: 'a',
    //     type: 'image',
    //     gallery: {enabled: true}
    // })
    // gotop button
    // get width of skill bard