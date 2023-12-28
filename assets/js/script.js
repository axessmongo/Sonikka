try {
    $('spinner').show();

    if ($(window).width() > 992) {
        $(document).mousemove(function (e) {
            var cursor = $('.cursor-icon');
            cursor.show();
            cursor.css('left', e.pageX + 'px');
            cursor.css('top', e.pageY + 'px');
        });

        $(document).click(function (e) {
            var cursor = $('.cursor-icon');
            cursor.css('left', e.pageX + 'px');
            cursor.css('top', e.pageY + 'px');
        });
    }

    $(document).ready(function () {
        AOS.init();
        // Close the navbar when clicking outside
        $(document).on('click', function (e) {
            if ($(window).width() <= 992) {
                if (!$(e.target).closest('.navbar').length && $('.navbar-collapse').hasClass('show')) {
                    $('.navbar-toggler').click();
                }
                $('.navbar .nav-link').on('click', function () {
                    // Your code to execute when a nav link is clicked
                    $('.navbar-toggler').click(); // This will simulate a click on the toggler
                });
            }
        });


        // navbar
        $(window).scroll(function () {

            if ($(this).scrollTop() >= 100) {
                $('.navbar').addClass('nav-animate');
                $('.navbar').removeAttr('data-aos data-aos-duration');
                if ($(this).scrollTop() > 300) {
                    $('.navbar').addClass('nav-fixed');
                }
            }
            else {
                // Scrolling up
                $('.navbar').removeClass('nav-animate nav-fixed');
            }
        });

        // navbar flip-text
        setTimeout(function () {
            $('.popup').removeClass('pop-ani');
        }, 2000);


        setInterval(function () {
            $('.popup').addClass('pop-ani');
        }, 5000);

        setInterval(function () {
            $('.popup').removeClass('pop-ani');
        }, 10000);


        $('.flip span').fadeOut(0)
        $('.flip span.active').fadeIn()
        setInterval(() => {
            const currentSpan = $('.flip span.active');
            const previousSpan = currentSpan.prev();
            const nextSpan = currentSpan.next();

            if (nextSpan.length > 0) {
                nextSpan.addClass('active').fadeIn();
                currentSpan.removeClass('active').fadeOut(0);
            } else {
                // If there is no next sibling, go back to the first sibling
                $('.flip span').first().addClass('active').fadeIn();
                currentSpan.removeClass('active').fadeOut(0); // Remove the class from the current active span
            }
        }, 2000);

        $(document).scroll(function () {
            let currentSectionId = null;

            $('section').each(function () {
                let rect = $(this).get(0).getBoundingClientRect();

                if (rect.top <= 50 && rect.bottom >= 0) {
                    currentSectionId = this.id;
                }
            });

            if (currentSectionId) {
                $('.navbar .nav-link').removeClass('active');
                $('.navbar .nav-link[href="#' + currentSectionId + '"]').addClass('active');
                if (currentSectionId == "recent-projects") {
                    $('.navbar .nav-link[href="#plans"]').addClass('active');
                } else if (currentSectionId == "home") {
                    $('.navbar .nav-link[href="#home"]').addClass('active');
                }
            }
        });




        var carimg = $('.amenties').height();
        $('.amenties .carousel img, .plans .carousel img').css('height', carimg);
        $(window).resize(function () {
            if ($(window).width() > 768) {
                var carimg = $('.amenties').height();
                $('.amenties .carousel img , .plans .carousel img').css('height', carimg);
            }
        })

        if ($(window).width() > 1200) {
            var planswidth = $('.plans-left').width();
            $('.plans-right').css('left', `calc(${planswidth}px + 5%)`);
        }
        $(window).resize(function () {
            if ($(window).width() > 1200) {
                var planswidth = $('.plans-left').width();
                $('.plans-right').css('left', `calc(${planswidth}px + 5%)`);
            }
        })


        const sections = $('.projects .project-left');
        let highlightedSection = null; // Variable to track the currently highlighted section
        var audio = $('#myaudio')[0];

        $(window).scroll(function () {
            const scrollPosition = $(window).scrollTop();
            const windowHeight = $(window).height();

            sections.each(function () {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionBottom = sectionTop + section.height();

                // Check if the section is in the middle of the screen
                if (scrollPosition >= sectionTop - windowHeight / 2 && scrollPosition < sectionBottom - windowHeight / 2) {
                    // Check if the section is not already highlighted
                    if (highlightedSection !== section[0]) {
                        sections.removeClass('highlight');
                        section.addClass('highlight');
                        audio.pause();
                        audio.play();
                        $('video').each(function () {
                            this.pause();
                        });
                        $('.highlight + .project-right video')[0].play();
                        highlightedSection = section[0];
                    }
                }
            });
        });

        $('.project-left').click(function () {
            var targetOffset = $(this).offset().top - ($(window).height() - $(this).outerHeight()) / 2;

            $('html, body').animate({
                scrollTop: targetOffset
            }, "fast"); // Adjust the duration as needed
        });


        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#scrollToTopBtn').fadeIn();
            } else {
                $('#scrollToTopBtn').fadeOut();
            }
        });

        $('.connect_method').click(function () {
            $('.tourForm').addClass('form-animate');
            setTimeout(() => {
                $('.tourForm').removeClass('form-animate');
            }, 1000);
        })

        // card creating

        // Your data - images and content for cards
        var cardData = [
            {
                id: 'blog1',
                image: 'assets/imagesandvectors/main-carousel/carousel-img-1.jpg',
                title: 'Standard Post Format',
                text: 'Enthusiastically disintermediate progressive innovation before high-payoff metrics. Intrinsicly generate sticky…'
            },
            {
                id: 'blog2',
                image: 'assets/imagesandvectors/main-carousel/carousel-img-3.jpg',
                title: 'Standard Post Format',
                text: 'Enthusiastically disintermediate progressive innovation before high-payoff metrics. Intrinsicly generate sticky…'
            },
            {
                id: 'blog3',
                image: 'assets/imagesandvectors/main-carousel/carousel-img-6.jpg',
                title: 'Standard Post Format',
                text: 'Enthusiastically disintermediate progressive innovation before high-payoff metrics. Intrinsicly generate sticky…'
            },
            {
                id: 'blog4',
                image: 'assets/imagesandvectors/main-carousel/carousel-img-2.jpg',
                title: 'Standard Post Format',
                text: 'Enthusiastically disintermediate progressive innovation before high-payoff metrics. Intrinsicly generate sticky…'
            },
            // Add more data as needed
        ];

        // Function to create a card element
        function createCard(id, image, title, text, num) {
            return `
            <div class="mb-3 px-2 ${id}">
                <div class="card border-0 shadow-1">
                    <img src="${image}" class="card-img-top" alt="...">
                    <div class="card-body py-4">
                        <p class="primary-text mb-3">In <a class ="secondary-color"
                         
                        ">Luxury</a></p>
                        <h5 class="card-title quartary-header">${title}</h5>
                        <p class="card-text primary-text mb-0">${text}</p>
                    </div>
                </div>
            </div>
            `;
        }

        //href="blog${num}.html

        // for (var i = 0; i < cardData.length; i++) {
        //     var card = createCard(cardData[i].image, cardData[i].title, cardData[i].text, i + 1);
        //     $('#createcard').append(card);
        // }

        // new -method
        const cards = cardData.map((data, index) => createCard(data.id, data.image, data.title, data.text, index + 1));
        $('#createcard').append(cards.join(''));

        const originalBodyId = $('body').attr('id');
        const pageId = originalBodyId.split("-page-").join('');
        const selector = '#' + originalBodyId + ' .' + pageId;
        const pageElement = $(selector);

        pageElement.remove();


        $(".owl-carousel-blog").owlCarousel({
            items: 3, // Number of items to display
            loop: true, // Infinite loop
            margin: 20, // Margin between items
            responsiveClass: true,
            nav: true,
            autoplay: true,
            autoplayTimeout: 2000, // Pause for 3 seconds between slides
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0, // Number of items to display on small screens
                },
                600: {
                    items: 2, // Number of items to display on medium screens
                },
                1000: {
                    items: 3, // Number of items to display on large screens
                }
            }
        });

        $(".owl-carousel-inex").owlCarousel({
            items: 3, // Number of items to display
            loop: true, // Infinite loop
            margin: 10, // Margin between items
            responsiveClass: true,
            autoplay: true,
            autoplayTimeout: 2000000, // Pause for 3 seconds between slides
            autoplayHoverPause: true,
            autoWidth: true,
            center: true,
            responsive: {
                0: {
                    items: 1,
                    margin: 0, // Number of items to display on small screens
                },
                600: {
                    items: 2, // Number of items to display on medium screens
                },
                1000: {
                    items: 3, // Number of items to display on large screens
                }
            }
        });

        // Scroll to top when the button is clicked
        $('#scrollToTopBtn').click(function () {
            $('html, body').animate({ scrollTop: 0 });
            return false;
        });
        AOS.refresh();
    });
}
catch {
    alert(err)
} finally {
    $('#spinner').remove()
}
