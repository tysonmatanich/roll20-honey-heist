const isValidStats = function (primary, secondary) {
  return (
    primary + secondary == 6 &&
    primary >= 0 &&
    primary <= 6 &&
    secondary >= 0 &&
    secondary <= 6
  );
};

const updateStats = function (eventName) {
  getAttrs(["primary", "secondary"], function (values) {
    let primary = parseInt(values.primary) || 0;
    let secondary = parseInt(values.secondary) || 0;

    if (!isValidStats(primary, secondary)) {
      primary = 3;
      secondary = 3;
    }

    if (eventName == "primary_modifier") {
      if (primary < 6) {
        primary += 1;
        secondary -= 1;
      }
    } else if (eventName == "secondary_modifier") {
      if (secondary < 6) {
        primary -= 1;
        secondary += 1;
      }
    }

    setAttrs({
      primary: primary,
      secondary: secondary,
    });
  });
};

const updateIsPrimaryBear = function () {
  getAttrs(["primary_type"], function (values) {
    if (
      values.primary_type &&
      values.primary_type.trim().toLowerCase() == "bear"
    ) {
      setAttrs({
        is_primary_bear: 1,
      });
    } else {
      setAttrs({
        is_primary_bear: 0,
      });
    }
  });
};

on("sheet:opened", function () {
  getAttrs(["primary", "secondary"], function (values) {
    if (!isValidStats(parseInt(values.primary), parseInt(values.secondary))) {
      setAttrs({
        primary: 3,
        secondary: 3,
      });
    }
  });
  updateIsPrimaryBear();
});

on("clicked:primary_modifier", function () {
  updateStats("primary_modifier");
});

on("clicked:secondary_modifier", function () {
  updateStats("secondary_modifier");
});

on("change:primary_type", function () {
  updateIsPrimaryBear();
});
