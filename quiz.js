document.addEventListener("DOMContentLoaded", function(event) {
    const question = document.getElementById("question");
    const answers = document.getElementById("answers");
    const options = document.getElementsByClassName("answer");
    const nextQuestion = document.getElementById("next");
    const scoreDisplay = document.querySelector(".results-score");
    let score = document.getElementById("score");
    let timerDisplay = document.getElementById("time");
    let matches = [];
    let choices = [];
    let answer, currentTimer, playing, points, timer, total;
    let closeButton = document.getElementById("close-popup");
    let popup = document.getElementById("popup");

    let questionNum = -1;
  
    function openPopup() {
      popup.style.opacity = "1";
      overlay.style.opacity = "1";
      popup.style.display = "block";
      overlay.style.display = "block";
      closeButton.addEventListener("click", start);
    }
  
    function closePopup() {
      popup.style.opacity = "0";
      overlay.style.opacity = "0";
      popup.style.display = "none";
      overlay.style.display = "none";
    }
  

    let questions = [];
    

    questions = [{
    "question" : "_________ computing refers to applications and services that run on a distributed network using virtualized resources.",
    "options"  : ["Distributed", "Cloud", "Soft", "Parallel"],
    "answer"   : "Cloud"
  },
  {
    "question" : "________ as a utility is a dream that dates from the beginning of the computing industry itself.",
    "options"  : ["Model", "Computing", "Software", "All of the mentioned"],
    "answer"   : "Computing"
  },
  {
    "question" : "Which of the following is essential concept related to Cloud?",
    "options"  : ["Reliability", "Productivity", "Abstraction", "All of the mentioned"],
    "answer"   : "Abstraction"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following cloud concept is related to pooling and sharing of resources?",
    "options"  : ["Polymorphism", "Abstraction", "Virtualization", "None of the mentioned"],
    "answer"   : "Virtualization"
  },
  {
    "question" : "Which of the following can be identified as cloud?",
    "options"  : ["Web Applications", "Intranet", "Hadoop", "All of the mentioned"],
    "answer"   : "Hadoop"
  },
  {
    "question" : "Cloud computing is an abstraction based on the notion of pooling physical resources and presenting them as a ________ resource.",
    "options"  : ["real", "virtual", "cloud", "none of the mentioned"],
    "answer"   : "virtual"
  },
  {
    "question" : "Which of the following is Cloud Platform by Amazon?",
    "options"  : ["Azure", "AWS", "Cloudera", "All of the mentioned"],
    "answer"   : "AWS"
  },
  {
    "question" : "Amazon EC2 provides virtual computing environments, known as :",
    "options"  : ["chunks", "instances", "messages", "none of the mentioned"],
    "answer"   : "instances"
  },
  {
    "question" : "Data stored in __________ domains doesn’t require maintenance of a schema.",
    "options"  : ["SimpleDB", "SQL Server", "Oracle", "RDS"],
    "answer"   : "SimpleDB"
  },
  {
    "question" : "Amazon EMR uses Hadoop processing combined with several __________ products",
    "options"  : ["AWS", "ASQ", "AMR", "AWES"],
    "answer"   : "AWS"
  },
  {
    "question" : "Which of the following provides access for developers to charge Amazon’s customers for their purchases ?",
    "options"  : ["FWS", "FAS", "FPS", "All of the mentioned"],
    "answer"   : "FPS"
  },
  {
    "question" : "How many EC2 service zones or regions exist ?",
    "options"  : ["1", "2", "3", "4"],
    "answer"   : "4"
  },
  {
    "question" : "Which of the following is a system for creating block level storage devices that can be used for Amazon Machine Instances in EC2 ?",
    "options"  : ["CloudWatch", "Amazon Elastic Block Store", "AWS Import/Export", "All of the mentioned"],
    "answer"   : "Amazon Elastic Block Store"
  },
  {
    "question" : "Which of the following is a structured data store that supports indexing and data queries to both EC2 and S3 ?",
    "options"  : ["CloudWatch", "Amazon SimpleDB", "Amazon Cloudfront", "All of the mentioned"],
    "answer"   : "Amazon SimpleDB"
  },
  {
    "question" : "Azure data is replicated ________ times for data protection and writes are checked for consistency.",
    "options"  : ["1", "2", "3", "5"],
    "answer"   : "3"
  },
  {
    "question" : "Which of the following is the central application in the AWS portfolio ?",
    "options"  : ["Amazon Elastic Compute Cloud", "Amazon Simple Queue Service", "Amazon Simple Notification Service", "Amazon Simple Storage System"],
    "answer"   : "Amazon Elastic Compute Cloud"
  },
  {
    "question" : "Which of the following is a message queue or transaction system for distributed Internet-based applications ?",
    "options"  : ["Amazon Simple Storage System", "Amazon Elastic Compute Cloud", "Amazon Simple Notification Service", "Amazon Simple Queue Service"],
    "answer"   : "Amazon Simple Queue Service"
  },
  {
    "question" : "Which of the following feature is used for scaling of EC2 sites ?",
    "options"  : ["Auto Replica", "Auto Scaling", "Auto Ruling", "All of the mentioned"],
    "answer"   : "Auto Scaling"
  },
  {
    "question" : "Which of the following metrics are used to support Elastic Load Balancing ?",
    "options"  : ["CloudWatch", "Amazon Elastic Block Store", "AWS Import/Export", "All of the mentioned"],
    "answer"   : "CloudWatch"
  },
  {
    "question" : "_________ is a cloud computing service model in which hardware is virtualized in the cloud.",
    "options"  : ["IaaS", "CaaS", "PaaS", " None of the mentioned"],
    "answer"   : "IaaS"
},
{
    "question" : "Which of the following is a virtual machine technology now owned by Oracle that can run various operating systems?",
    "options"  : ["Vmachines", "VirtualBox", "ThoughtPolice", "None of the mentioned"],
    "answer"   : "VirtualBox"
},
{
    "question" : " Which of the following is owned by an organization selling cloud services?",
    "options"  : ["Public", "Private", "Community", "Hybrid"],
    "answer"   : "Public"
},
{
    "question" : "How many types of service model are mainly present in Cloud?",
    "options"  : ["1", "2", "3", "4"],
    "answer"   : "3"
},
{
    "question" : " Which of the following is the IaaS service provider?",
    "options"  : ["EC2", "EC10", "EC1", "EC5"],
    "answer"   : "EC2"
},
{
    "question" : "  Which of the following service provider provides the least amount of built in security?",
    "options"  : ["SaaS", "PaaS", "IaaS", "All of the mentioned"],
    "answer"   : "IaaS"
},
{
    "question" : "  Which of the following area of cloud computing is uniquely troublesome?",
    "options"  : ["Auditing", "Data integrity", "e-Discovery for legal compliance", "All of the mentioned"],
    "answer"   : "EC2"
},
{
    "question" : "Which of the following is application and infrastructure management software for hybrid multi-clouds?",
    "options"  : ["VMware Hyperic", "Webmetrics", "Univa UD", "Tapinsystems"],
    "answer"   : "Univa UD"
},
{
    "question" : " Point out the correct statement.",
    "options"  : ["Amazon Elastic Cloud is a system for creating virtual disks", "SimpleDB interoperates with both Amazon EC2 and Amazon S3", "EC3 is an Analytics as a Service provider", "None of the mentioned"],
    "answer"   : "SimpleDB interoperates with both Amazon EC2 and Amazon S3"
},
{
    "question" : "Which of the following is an edge-storage or content-delivery system that caches data in different physical locations?",
    "options"  : ["Amazon Relational Database Service", "Amazon SimpleDB", "Amazon Cloudfront", "Amazon Associates Web Services"],
    "answer"   : "Amazon Cloudfront"
},
{
    "question" : "Which of the following is the property of the composable component?",
    "options"  : ["stateful", "stateless", "symmetric", "All of the mentioned"],
    "answer"   : "stateless"
},
{
    "question" : "Which of the following is the highest degree of integration in cloud computing?",
    "options"  : ["CaaS", "AaaS", "PaaS", "SaaS"],
    "answer"   : "SaaS"
},
{
    "question" : "Which of the architectural layer is used as a front end in cloud computing?",
    "options"  : ["client", "cloud", "soft", "all of the mentioned"],
    "answer"   : "client"
},
{
    "question" : "Communication between services is done widely using _______ protocol.",
    "options"  : ["REST", "SOAP", "RESTful", "None of the mentioned"],
    "answer"   : "SOAP"
},
{
    "question" : "Which of the following is storage data interchange interface for stored data objects?",
    "options"  : ["OCC", "OCCI", "OCMI", "All of the mentioned"],
    "answer"   : "OCCI"
},
{
    "question" : " ________ data represents more than 50 percent of the data created every day.",
    "options"  : ["Shadow", "Light", "Dark", "All of the mentioned"],
    "answer"   : "Shadow"
},
{
    "question" : "Which of the following is one of the properties that differentiates cloud computing?",
    "options"  : ["scalability", "virtualization", "composability", "all of the mentioned"],
    "answer"   : "composability"
},
{
    "question" : "A _________ is a cloud computing service that is both hardware and software.",
    "options"  : ["service", "platform", "model", "all of the mentioned"],
    "answer"   : "platform"
},
{
    "question" : "Cloud computing doesn’t require that ________ and software be composable.",
    "options"  : ["cloud", "database", "hardware", "all of the mentioned"],
    "answer"   : "hardware"
},
{
    "question" : "The most commonly used set of protocols uses ______ as the messaging format.",
    "options"  : ["XML", "JSON", "BSON", "All of the mentioned"],
    "answer"   : "XML"
},
{
    "question" : " Which of the following language is used to manage transactions?",
    "options"  : ["WSDL", "XML", "SOAP", "All of the mentioned"],
    "answer"   : "WSDL"
},
{
    "question" : "A ________ cloud requires virtualized storage to support the staging and storage of data.",
    "options"  : ["soft", "compute", "local", "none of the mentioned"],
    "answer"   : "none of the mentioned"
},
{
    "question" : "Which of the architectural layer is used as backend in cloud computing?",
    "options"  : ["client", "cloud", "soft", "None of the mentioned"],
    "answer"   : "cloud"
},
{
    "question" : "Which of the following service does not support backup on the Linux platform?",
    "options"  : ["Backblaze", "Crashplan", "Datapreserve", "ADrive"],
    "answer"   : "Backblaze"
},
{
    "question" : " Which of the following is the most important client to back up in the cloud?",
    "options"  : ["Windows", "Mac", "Linux", "all of the mentioned"],
    "answer"   : "all of the mentioned"
},
{
    "question" : "Which of the following is the least important feature of cloud storage listed below?",
    "options"  : ["Multisite storage or replication", "24×7 technical support", "Data versioning", "All of the mentioned"],
    "answer"   : "Multisite storage or replication"
},
{
    "question" : "Which of the following service creates an application hosting environment?",
    "options"  : ["EBS", "Azure AppFabric", "ESW", "All of the mentioned"],
    "answer"   : "Azure AppFabric"
},
{
    "question" : "Which of the following is also known as Compute?",
    "options"  : ["set of virtual machine instances", "set of replicas", "set of commodity servers", "all of the mentioned"],
    "answer"   : "set of virtual machine instances"
},
{
    "question" : "________ has many of the characteristics of what is now being called cloud computing.",
    "options"  : ["Internet", "Softwares", "Web Service", "All of the mentioned"],
    "answer"   : "Internet"
}];



  if (!location.pathname.match(/fullcpgrid/i)) {
        openPopup();
      } else {
        start();
      } 


      // fetch('questions.json', {mode: 'no-cors'})
       //.then(resp => resp.json())
      // .then(data => {
       
         //questions = data;
        
       
         //if (!location.pathname.match(/fullcpgrid/i)) {
           //openPopup();
         //} else {
         //  start();
       //  }
     //  });
    // At this point all the potential questions have been found.
     //console.log(matches);
  

    function shuffle(array) { 

      for(let i = array.length - 1; i > 0; i--){
          const j = Math.floor(Math.random() * i)
          const temp = array[i]
          array[i] = array[j]
          array[j] = temp
        }
    
    }

    let ranQuestions = [];

    for(let i=0; i<questions.length; i++)
    {
      ranQuestions[i] = i;
    }




    function start() {
      shuffle(ranQuestions);
      questionNum = -1;
      points = 0;
      score.innerHTML = points;
      currentTimer = 120;
      playing = true;
      getNewQuestion();
      timerDisplay.innerHTML = currentTimer;
      closePopup();
      timer = setInterval(function() {
        updateTimer();
      }, 1000);
    }
  
    function updateTimer() {
      currentTimer--;
      timerDisplay.innerHTML = currentTimer;
      if (currentTimer === 0) {
        playing = false;
        endGame();
      }
    }
  
    function endGame() {
      clearInterval(timer);
      playing = false;
      endRound();
      scoreDisplay.innerHTML = points;
      popup = document.getElementById("results");
      closeButton = document.getElementById("close-results");
      openPopup();
    }
  
    function getNewQuestion() {


      questionNum++;

      if(questionNum == questions.length)
      {
        endGame();
        return;
      }
        
      

      nextQuestion.style.opacity = 0;
      // Create a new array using the total of characters
      //const randomOrder = [...Array(total).keys()].map(num => num + 1);
      //randomOrder.sort(() => Math.random() - 0.5);

      let que = questions[ranQuestions[questionNum]];
      question.innerHTML = que.question;
       
      for (let i = 0; i < 4; i++) {
        options[i].innerHTML = que.options[i];
      }

      

    }
  
    function checkAnswer(choice, id) {
      if (choice == questions[ranQuestions[questionNum]].answer) {
        points += 10;
        options[id].classList.add("correct");
        answers.classList.add("disabled");
      } else {
        points -= 10;
        options[id].classList.add("wrong");
      }
      score.innerHTML = points;
      nextQuestion.style.opacity = 1;
    }
  
    function endRound() {
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove("correct");
        options[i].classList.remove("wrong");
      }
      if (playing) {
        getNewQuestion();
      }
      answers.classList.remove("disabled");
    }
  
    answers.addEventListener("click", event => {
      const isButton = event.target.nodeName === "BUTTON";
      if (!isButton) {
        return;
      }
      let chosen = event.target.innerHTML;
      let id = event.target.id.slice(-1);
      checkAnswer(chosen, id);
    });
  
    closeButton.addEventListener("click", start);
    nextQuestion.addEventListener("click", endRound);
  });