<!DOCTYPE html>
<html>
<head>
  <title></title>

  <meta content="width=device-width, maximum-scale=1.0, initial-scale=1.0, user-scalable=no" name="viewport">
  <meta content="yes" name="apple-mobile-web-app-capable">

  <link rel="stylesheet" href="stylesheets/styles.css">

  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
  <!-- Latest compiled and minified JavaScript -->
  <script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

  <script src="javascripts/app.js"></script>


</head>
<body>

<div id="menu">

  <ul>
    <li>Startseite</li>
    <li>
      Projects
      <ul>
        <li>Bachelor</li>
        <li>Master</li>
      </ul>
    </li>

    <li>
      Games Spot
      <ul>
        <li>HAW</li>
        <li>Tests</li>
        <li>News</li>
      </ul>
    </li>
    <li>
      Tech News
      <ul>
        <li>Software</li>
        <li>Hardware</li>
      </ul>
    </li>


  </ul>


</div>


<div id="logo">
  <img src="logo.gif">
</div>

<div id="content-wrapper">
  <div class="content-wrapper-inner">

    <div class="teaser teaser-big">
      <div class="hl-wrapper">
        <h2 class="kicker">Konnte dieses der flehentlich</h2>

        <h3 class="headline">Zwischen beiden Gebauden</h3>
      </div>

      <a href="article.php"><img class="" src="dummy_content/assassin-s-creed-3-reveal-trailer.jpg"></a>
    </div>

    <?php for ($i = 0; $i < 5; $i++): ?>

      <div class="teaser teaser-small">
        <div class="teaser-image">
          <div class="category">HAW</div>
          <a href="article.php"><img class="" src="dummy_content/assassin-s-creed-3-reveal-trailer.jpg"></a>
        </div>
        <div class="teaser-content">
          <h2 class="kicker">Konnte dieses der flehentlich</h2>

          <h3 class="headline">Zwischen beiden Gebauden</h3>
        </div>
      </div>

    <?php endfor; ?>

    <?php for ($i = 0; $i < 4; $i++): ?>
      <div class="teaser teaser-medium">
        <div class="teaser-image">
          <div class="category">HAW</div>
          <a href="article.php"><img class="" src="dummy_content/assassin-s-creed-3-reveal-trailer.jpg"></a>
        </div>
        <div class="teaser-content">
          <h2 class="kicker">Konnte dieses der flehentlich</h2>

          <h3 class="headline">Zwischen beiden Gebauden</h3>
        </div>
      </div>

    <?php endfor; ?>


    <?php for ($i = 0; $i < 5; $i++): ?>

      <div class="teaser teaser-small">
        <div class="teaser-image">
          <div class="category">HAW</div>
          <a href="article.php"><img class="" src="dummy_content/assassin-s-creed-3-reveal-trailer.jpg"></a>
        </div>
        <div class="teaser-content">
          <h2 class="kicker">Konnte dieses der flehentlich</h2>

          <h3 class="headline">Zwischen beiden Gebauden</h3>
        </div>
      </div>

    <?php endfor; ?>


  </div>
</div>

<div id="article-content"></div>

</body>
</html>