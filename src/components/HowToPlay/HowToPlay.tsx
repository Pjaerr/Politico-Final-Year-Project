import React from "react";

import Modal from "../Modal/Modal";

import styles from "./HowToPlay.module.scss";

type Props = {
  onCloseFunc: () => void;
};

const HowToPlay = ({ onCloseFunc }: Props) => {
  return (
    <Modal title="How To Play" onCloseFunc={onCloseFunc}>
      <section className={styles.container}>
        <p>
          Welcome to Politico, the game where you must make important decisions,
          but remember that you can't please everybody!
        </p>

        <p>
          The aim of the game is to survive your time as Prime Minister, each
          turn you must make a decision that may be liked or disliked by your
          nation, as well as by your political party. You must also take into
          account the effects the decision will have on both your finances and
          your standing in the eyes of the rest of the world.
        </p>

        <h2>Getting Started</h2>

        <p>
          You can choose to start a new game or continue an existing game (these
          are saved on this device automatically). When you start the game you
          will be greeted with the following view:
        </p>

        <img
          src="screenshot_game_screen.png"
          alt="Screenshot of the game view"
        />

        <p>
          You can do a couple things, first of all you should probably click
          around the different regions on the map to gauge the current political
          leaning of your country. Note, these are just rough estimates but
          should be good enough as a first basis! It'll look something like the
          following:
        </p>

        <img
          src="screenshot_game_region_modal.png"
          alt="Screenshot of the game view with the region modal open"
        />

        <p>
          The way a certain region leans on the political spectrum affects the
          overall nation's happiness level whenever you make a decision, you
          should keep this in mind and always watch that happiness bar! Make
          sure to not neglect the other areas of your nation, all of which are
          affected by the decisions you make.
        </p>

        <p>
          Next you'll want to make your first decision, this looks like the
          following:
        </p>

        <img
          src="screenshot_game_decision_modal.png"
          alt="Screenshot of the game view with the decision modal open"
        />

        <p>
          The effects of the decision can be seen on the modal, remember these
          are just rough estimates. You can choose to either say <b>yes</b> to
          the decision or to say <b>no</b>, both will have different results,
          make sure you're sure before you choose! You can also decide to close
          the decision modal to inform your choice by looking at the current
          standing of the nation.
        </p>

        <p>
          An important note: Your domestic political favour is decided based on
          the regions that are represented by a member of your party, these are
          denoted in green. So remember, if your domestic political favour is
          running low, be careful not to upset those regions!
        </p>

        <p>
          and that's it! Your goal is to keep making decisions until you've
          reached the end of your leadership timespan, if any of your nation's
          attributes drop below 0, you'll lose so make sure to keep an eye on
          them!
        </p>
      </section>
    </Modal>
  );
};

export default HowToPlay;
