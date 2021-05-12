function any_response_not_in_result(list1, list2) {
    for (var index = 0; index < list1.length; index++) {
        console.log((list1[index]), list2)
        if (list2.indexOf(list1[index]) == -1) {
            return true;
        }
    }
    return false;
}

var app = new Vue({
    el: "#app",

    data: {
        quizz_passed: false,
        nameNotEntered: true,
        readText: false,
        started: false,
        user: "",
        message: "",
        questions: '',
        output: [],
        user_point: 0,
        total_points: 0,
        x: 0,


    },
    mounted: function () {
        console.log('mounted successfully')
        
        if (localStorage.quizz_passed) {
            this.quizz_passed = localStorage.quizz_passed
            console.log(this.quizz_passed)
            this.user = localStorage.user
            this.nameNotEntered = false
            this.readText = true
        }
        this.getQuestions()
    },
    delimiters: ['${', '}'],
    methods: {
        checkUsername: function () {

            if (this.user.length < 3) {
                this.message = "Veuillez saisir un nom de plus de 3 lettres!"
                console.log(this.message)
            } else {
                this.nameNotEntered = false
                this.readText = true
            }

        },
        beforeStarting: function () {
            $('#StartPopUp').modal('show')
        },
        beforeStartingCanceled: function () {
            this.readText = true
        },
        start: function () {
            $('#StartPopUp').modal('hide')
            this.readText = false
            this.started = true
            this.quizz_passed = true
            this.timeLeft()
        },
        finished : function () {
            this.output = []
            this.user_point = 0
            this.total_points = 0
            clearInterval(this.x);
            this.questions.forEach((el) => {
                var inputs = document.getElementsByName(el.titre)
                let item = new Object()
                item[el.titre] = ''
                this.total_points += el.points

                inputs.forEach((self) => {
                    if (self.type != 'text') {
                        if (self.checked) {
                            item[el.titre] += self.value + ','
                        }
                    } else if (self.type == 'text') {
                        item[el.titre] = self.value
                        if (self.value.trim().toUpperCase() == el.reponse.trim().toUpperCase()) {
                            this.user_point += 1
                        }
                    }
                })
                this.output.push(item)
                index = this.questions.indexOf(el)


                good_response = []
                user_response = []

                el.reponse.split(',').forEach((r) => {
                    good_response.push(r.trim().toUpperCase())
                })
                this.output[index][el.titre].split(',').slice(0, -1).forEach(r => {
                    user_response.push(r.trim().toUpperCase())
                })

                if (user_response.length > 0) {
                    if (any_response_not_in_result(user_response, good_response)) {
                        this.user_point += 0
                    } else {
                        this.user_point += 1
                    }

                }
            })
            this.readText = true
            this.started = false

            $('#ResultPopUp').modal('show')
            this.readText = true
            this.quizz_passed = true

            localStorage.user = this.user
            localStorage.score = this.user_point
            localStorage.validé = this.user_point >= 0 ? true : false
            localStorage.quizz_passed = this.quizz_passed

        },
        timeLeft: function () {
            // Set the date we're counting down to
            var countDownDate = new Date().getTime();
            countDownDate += 1000 * 60 * 5

            // Update the count down every 1 second
            this.x = setInterval(function () {

                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                document.getElementById("timer").innerHTML = minutes + ":" + seconds;

                // If the count down is finished, write some text
                if (distance <= 1000 * 60 * 0.3) {
                    document.getElementById("timer").classList.remove('text-dark');
                    document.getElementById("timer").classList.add('text-danger');

                }
                console.log(distance)
                if (distance <= 0) {
                    clearInterval(this.x);

                    this.app.finished()
                }
            }, 1000);
        },
        getQuestions: function () {
            axios
                .get(document.location.origin + '/questions/')
                .then(response => (this.questions = response.data))

        }
       
    },




})