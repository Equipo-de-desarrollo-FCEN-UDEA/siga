from functools import lru_cache
import logging

from .config import get_app_settings

settings = get_app_settings()


#Aquí generamos un filtro de acuerdo al nivel del logging
class Filter(logging.Filter):
    def filter(self, record):
        if record.levelno == settings.logging_level:
            return False
        return True


#Le damos formato a los tipos de logings que manejemos
class Format(logging.Formatter):
    grey = "\x1b[38;21m"
    yellow = "\x1b[33;21m"
    red = "\x1b[31;21m"
    purple = "\x1b[1;35m"
    bold_red = "\x1b[31;1m"
    reset = "\x1b[0m"
    green = "\x1b[32m"
    asctime = "%(asctime)s"
    name = "[%(name)s]"
    levelname = "[%(levelname)-4s]"
    message = "%(message)s"

    FORMATS = {
        logging.DEBUG: f"{asctime} {purple} {name} {levelname} {reset} {message}",
        logging.INFO: f"{asctime} {green} {name} {levelname} {reset} {message}",
        logging.WARNING: f"{asctime} {yellow} {name} {levelname} {message} {reset}",
        logging.ERROR: f"{asctime} {red} {name} {levelname} {message} {reset}",
        logging.CRITICAL: f"{asctime} {bold_red} {name} {levelname} {message} {reset}",
    }

    def format(self, record):
        log_fmt = self.FORMATS.get(record.levelno)
        formatter = logging.Formatter(log_fmt)
        return formatter.format(record)


#Exportamos el logging con toda la configuración anterior
@lru_cache
def get_logging(mod_name: str) -> logging.Logger:
    log = logging.getLogger(mod_name)
    handler = logging.StreamHandler()
    handler.setFormatter(Format())
    log.addHandler(handler)
    log.setLevel(settings.logging_level)
    return log
