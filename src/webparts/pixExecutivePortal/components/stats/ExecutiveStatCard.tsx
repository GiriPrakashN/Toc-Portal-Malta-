import * as React from "react";

import {
  IExecutiveStat
} from "../../models/IExecutiveStats";

interface IProps {
  item: IExecutiveStat;
}

const ExecutiveStatCard = ({
  item
}: IProps): JSX.Element => {

  return (

    <div className="pix-stat-card">

      <div
        className={`
          pix-stat-card__top
          pix-stat-card__top--${item.accent}
        `}
      />

      <div className="pix-stat-card__icon">

        {item.icon}

      </div>

      <div className="pix-stat-card__title">

        {item.title}

      </div>

      <div className="pix-stat-card__value">

        {item.value}

      </div>

      <div className="pix-stat-card__subtitle">

        {item.subtitle}

      </div>

    </div>
  );
};

export default ExecutiveStatCard;