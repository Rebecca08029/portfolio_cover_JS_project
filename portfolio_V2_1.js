//check with input is selected in each question and store the result in a variable
// once submit is clicked, generate text and another CTA direct user to one of the portfolio

let answer1;
let answer2;
let answer3;
const app = {};
app.apiKey = "7qBMAP9pBGYcLyjyp83OqT6f0h2SIHIC";

// function checkBtnState() {
//   $("input").prop("checked");
// }

$(function () {
  // app.init();

  // $("label").on("click", function () {
  //   answer1 = $("label[name=band]").val();
  //   console.log(answer1);
  //   // checkBtnState();
  //   // console.log(checkBtnState());
  // });

  // $("label").on("click", function () {
  //   if ($(this).attr("name") === "band") {
  //     $(`input[name=band][value=${$(this).val()}]`).prop("checked", true);
  //     answer1 = $(this).val();
  //     console.log(answer1);
  //   } else if ($(this).attr("name") === "conference") {
  //     $(`input[name=conference][value=${$(this).val()}]`).prop("checked", true);
  //     answer2 = $(this).val();
  //   } else if ($(this).attr("name") === "job") {
  //     $(`input[name=job][value=${$(this).val()}]`).prop("checked", true);
  //     answer3 = $(this).val();
  //   }
  // });

  $("label").on("click", function () {
    const valueOfUserSelection = $(this).attr("value");
    console.log(valueOfUserSelection);
    if ($(this).attr("name") === "band") {
      $(`input[name=band][value="${valueOfUserSelection}"]`).prop(
        "checked",
        true
      );
      answer1 = valueOfUserSelection;
      console.log(answer1);
    } else if ($(this).attr("name") === "conference") {
      $(`input[name=conference][value="${valueOfUserSelection}"]`).prop(
        "checked",
        true
      );
      answer2 = valueOfUserSelection;
    } else if ($(this).attr("name") === "job") {
      $(`input[name=job][value="${valueOfUserSelection}"]`).prop(
        "checked",
        true
      );
      answer3 = valueOfUserSelection;
    }
  });
  // $("label").on("click", function () {
  //   answer2 = $("input[name=conference]:checked").val();
  //   console.log(answer2);
  // });

  // $("label").on("click", function () {
  //   // $(".result3").html()
  //   answer3 = $("input[name=job]:checked").val();
  //   console.log(answer3);
  // });
});

app.getImagesMarketing = function () {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
      q: "marketing",
      rating: "g",
      limit: "1",
    },
  }).then(function (result) {
    app.displayImages(result.data);
  });
};

app.getImagesRetro = function () {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
      q: "retro",
      rating: "g",
      limit: "1",
    },
  }).then(function (result) {
    app.displayImages(result.data);
  });
};

app.getImagesDesign = function () {
  $.ajax({
    url: "http://api.giphy.com/v1/gifs/search",
    method: "GET",
    dataType: "json",
    data: {
      api_key: app.apiKey,
      q: "design",
      rating: "g",
      limit: "1",
    },
  }).then(function (result) {
    app.displayImages(result.data);
  });
};

app.displayImages = function (data) {
  data.forEach(function (gifOjb) {
    console.log(gifOjb);
    const htmlString = `
    <div class ="img-box">
    <img src="${gifOjb.images.fixed_height.url}" alt="${gifOjb.title}"/>
    </div>
    `;
    $(".giphy").html(htmlString);
  });
};

$("#submit").click(function () {
  $(".result_container").css({
    margin: "0 auto",
    "margin-top": "1px",
    "margin-bottom": "120px",
    width: "840px",
    height: "492px",
    "background-color": "#1b2b39",
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  });
  $(".two_columns").css({
    display: "flex",

    "align-items": "center",
  });
});
// Default:
// Recruiter, If they choose anything but Beetles or Lana
// Mentees, same as above
// Other, If they choose Design conference of sleep in

// Retro:
// Recruiter, If they choose anything With Beetles or Lana
// Mentees, same as above

// Marketing:
// Other, If they choose Marketing campaign
// Marketer

// function manageBtn() {
//   const bt = $("#submit");
//   if (answer1 === "" && answer2 === "" && answer3 === "") {
//     bt.disabled = false;
//   } else {
//     bt.disabled = true;
//   }
// }

const default_link = "https://rebeccaliu.work";
const marketing_link = "https://rlcreativeconsulting.myportfolio.com/";
const retro_link = "https://google.com/";

$("form").submit(function (event) {
  event.preventDefault();

  if (answer3 === "client") {
    $(".result3").html("we are taking you to my marketing portfolio");
    $(".link").css({
      display: "block",
    });
    $(".link").wrapInner("<a href=" + marketing_link + ">" + "</a>");
    app.getImagesMarketing();
  } else if (
    (answer1 === "lana" || answer1 === "beatles") &&
    (answer3 === "recruiter" || answer3 === "mentee")
  ) {
    $(".result3").html("Let's take you to my retro design portfolio");
    $(".link").css({
      display: "block",
    });
    $(".link").wrapInner("<a href=" + retro_link + ">" + "</a>");

    app.getImagesRetro();
  } else if (
    (answer1 === "wonder" ||
      answer1 === "dragon" ||
      answer1 === "band_other") &&
    (answer3 === "recruiter" || answer3 === "mentee")
  ) {
    $(".result3").html("Let's take you to my default design portfolio");
    $(".link").css({
      display: "block",
    });
    $(".link").wrapInner("<a href=" + default_link + ">" + "</a>");

    app.getImagesDesign();
  } else {
    $(".result3").html("Let's take you to my default design portfolio");
    $(" .link").css({
      display: "block",
    });
    $(".link").wrapInner("<a href=" + default_link + ">" + "</a>");

    app.getImagesDesign();
  }
});
